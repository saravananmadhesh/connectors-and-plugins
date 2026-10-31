# Editing & Drill Operations

## ⚠️ SECURITY NOTICE

**All OLAP connections MUST use authenticated, enterprise-managed OLAP servers.** Never connect to untrusted OLAP endpoints. See [core-concepts.md Security Best Practices](./core-concepts.md#security-best-practices) for comprehensive security guidelines.

✅ **Required Security Controls:**
- Enterprise OLAP server authentication
- Role-based access control (RBAC)
- Encrypted connections (HTTPS/SSL)
- Configuration-based endpoints (never hardcoded)

## Table of Contents
- [Cell Editing](#cell-editing)
- [Edit Settings & Modes](#edit-settings--modes)
- [Edit Events](#edit-events)
- [Drill Through](#drill-through)
- [Drill Through Events](#drill-through-events)

## Cell Editing

### Enable Cell Editing (Relational Data Only)

> **Note:** The cell editing feature is applicable only for relational data sources.

Cell editing allows users to directly change data in the pivot table by adding, updating, or deleting raw data items within any value cell. When you double-click a value cell, the raw items appear in a data grid within a new window. In this data grid, you can perform CRUD operations. After you finish editing the raw items, the pivot table automatically updates the aggregated values.

To enable editing, set the `allowEditing` property in `editSettings` to **true**:

```typescript

@Component({
  selector: 'app-pivot',
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [editSettings]="editSettings">
  </ejs-pivotview>`
})
export class AppComponent {
  editSettings: any = {
    allowEditing: true,
    mode: 'Dialog',
    allowDeleting: true,
    allowAdding: true,
    allowCommandColumns: false,
    allowEditOnDblClick: true,
    showConfirmDialog: true,
    showDeleteConfirmDialog: true,
    allowInlineEditing: false
  };

  dataSourceSettings: IDataOptions = {
    dataSource: editableData,
    rows: [{ name: 'Category' }],
    columns: [{ name: 'Region' }],
    values: [{ name: 'Sales', type: 'Sum' }]
  };
}
```

### Edit Settings Properties

The `editSettings` property controls editing behavior through these key options:

| Property | Type | Description |
|----------|------|-------------|
| `allowEditing` | boolean | Enables/disables editing mode |
| `allowAdding` | boolean | Enables adding new rows to the data grid |
| `allowDeleting` | boolean | Enables deleting records from the data grid |
| `allowCommandColumns` | boolean | Displays built-in command buttons (edit, delete, save, cancel) |
| `mode` | string | Sets the editing mode: Normal, Dialog, Batch, or Column Commands |
| `allowEditOnDblClick` | boolean | Enables start editing by double-clicking a cell |
| `showConfirmDialog` | boolean | Shows confirmation dialog before saving changes |
| `showDeleteConfirmDialog` | boolean | Shows confirmation dialog before deleting |
| `allowInlineEditing` | boolean | Allows editing content directly in the cell (single raw data item only) |

### CRUD Operations in Data Grid

The toolbar and command column provide these CRUD operations:

| Toolbar Button | Action |
|---|---|
| Add | Add a new row to the data grid |
| Edit | Edit the current row or cell |
| Delete | Delete the current row |
| Update | Save the edited row or cell |
| Cancel | Cancel the editing state |

## Edit Settings & Modes

### Edit Modes: Normal

Normal edit mode allows users to edit one row at a time in an editing dialog with simple data changes and updates. This is the **default mode**.

When editing begins, the selected row changes to edit state. Cell values can be modified and saved by clicking the **Update** toolbar button.

```typescript
editSettings: any = {
  allowEditing: true,
  mode: 'Normal',
  allowDeleting: true,
  allowAdding: true,
  allowCommandColumns: false
};
```

### Edit Modes: Dialog

Dialog edit mode displays the selected row data in an exclusive dialog window, ensuring clear visibility and controlled data modification.

When editing begins, the currently selected row data appears in a dedicated dialog. Cell values can be modified and saved by clicking the **Save** button in the dialog.

```typescript
editSettings: any = {
  allowEditing: true,
  mode: 'Dialog',
  allowDeleting: true,
  allowAdding: true,
  allowCommandColumns: false,
  showConfirmDialog: true
};
```

### Edit Modes: Batch

Batch editing enables users to make multiple changes to data grid cells and save them all at once, improving efficiency for bulk updates.

When a user double-clicks any data grid cell in batch mode, the target cell changes to edit state. Users can perform multiple changes and save all modifications (added, changed, and deleted data) to the data source by clicking the **Update** toolbar button.

```typescript
editSettings: any = {
  allowEditing: true,
  mode: 'Batch',
  allowDeleting: true,
  allowAdding: true,
  allowCommandColumns: false
};
```

### Edit Modes: Command Columns

Command columns provide dedicated action buttons within the data grid for streamlined CRUD operations as an alternative to toolbar options.

An additional column appears in the data grid layout containing command buttons to perform CRUD operations:

| Command Button | Action |
|---|---|
| Edit | Edit the current row |
| Delete | Delete the current row |
| Save | Update the edited row |
| Cancel | Cancel the edited state |

```typescript
editSettings: any = {
  allowEditing: true,
  mode: 'Batch',  // Works with all modes
  allowCommandColumns: true,
  allowDeleting: true,
  allowAdding: true
};
```

### Inline Editing

Inline editing provides streamlined data modification by allowing direct editing of value cells without opening an external dialog, improving workflow efficiency for quick data updates.

> **Important:** This editing mode applies only when a single raw data item corresponds to the value of the cell.

```typescript
editSettings: any = {
  allowEditing: true,
  allowInlineEditing: true,
  mode: 'Dialog',  // Works with all modes
  allowDeleting: true,
  allowAdding: true
};
```

### Editing via Pivot Chart

Pivot chart editing provides an alternative way to conveniently update, add, or remove underlying data associated with any chart data point. Users can perform CRUD operations on the underlying raw items linked to visualized data points.

Clicking a data point in the pivot chart displays the underlying raw items in a data grid within a popup window. Users can then add, update, or delete these items using any of the supported edit types (normal, dialog, batch, or command column).

```typescript
import { PivotChartService, CalculatedFieldService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  selector: 'app-pivot-chart',
  providers: [PivotChartService, CalculatedFieldService],
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [chartSettings]="chartSettings"
    [editSettings]="editSettings">
  </ejs-pivotview>`
})
export class AppComponent {
  chartSettings: any = {
    chartSeries: { type: 'Column' }
  };

  editSettings: any = {
    allowEditing: true,
    mode: 'Dialog',
    allowDeleting: true,
    allowAdding: true
  };
}
```

## Edit Events

### EditCompleted Event

The `editCompleted` event triggers when value cells are edited completely. This event provides edited cell(s) information along with its previous cell value and helps perform manual CRUD operations.

**Event Parameters:**
- `currentData`: Holds the current raw data of the edited cells
- `previousData`: Holds the previous raw data of the edited cells
- `previousPosition`: Holds the index of the raw data whose values are edited
- `cancel`: Set to **true** to prevent the editing from reflecting in the pivot table

```typescript
@Component({
  selector: 'app-pivot',
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [editSettings]="editSettings"
    (editCompleted)="onEditCompleted($event)">
  </ejs-pivotview>`
})
export class AppComponent {
  onEditCompleted(args: any) {
    console.log('Current data:', args.currentData);
    console.log('Previous data:', args.previousData);
    
    // Manually update backend or handle custom logic
    this.updateDataSource(args.currentData, args.previousPosition);
  }

  updateDataSource(data: any, index: number) {
    // POST updated data to server
    this.api.updatePivotData(data).subscribe(
      (response: any) => {
        console.log('Data updated successfully');
      },
      (error: any) => {
        console.error('Update failed:', error);
      }
    );
  }
}
```

### ActionBegin Event

The `actionBegin` event triggers when editing actions such as add, edit, save, or delete are started through the UI. This lets users monitor the editing workflow and take action before the operation completes.

**Event Parameters:**
- `dataSourceSettings`: Contains current data source settings
- `actionName`: Shows the name of the editing action (Edit record, Save edited records, Add new record, Remove record)
- `cancel`: Set to **true** to stop (cancel) the action

**Possible Action Names:**
| Action | Action Name |
|--------|-----------|
| Editing | Edit record |
| Save | Save edited records |
| Add | Add new record |
| Delete | Remove record |

```typescript

@Component({
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [editSettings]="editSettings"
    (actionBegin)="onActionBegin($event)">
  </ejs-pivotview>`
})
export class AppComponent {
  onActionBegin(args: any) {
    if (args.actionName === 'Add new record') {
      console.log('Adding new record - can be restricted here');
      // Restrict add action by setting cancel = true
      // args.cancel = true;
    }

    if (args.actionName === 'Save edited records') {
      console.log('Saving records:', args.dataSourceSettings);
      // Perform pre-save validation
    }

    if (args.actionName === 'Remove record') {
      console.log('Deleting record');
      // Confirm deletion
    }
  }
}
```

### ActionComplete Event

The `actionComplete` event triggers whenever a UI action such as add, update, remove, or save is finished.

**Event Parameters:**
- `dataSourceSettings`: Contains current data source settings
- `actionName`: Name of the completed action (Edited records saved, New record added, Record removed, Records updated)
- `actionInfo`: Unique information about the current UI action

**Possible Action Names:**
| Action | Action Name |
|--------|-----------|
| Save | Edited records saved |
| Add | New record added |
| Delete | Record removed |
| Update | Records updated |

```typescript

@Component({
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [editSettings]="editSettings"
    (actionComplete)="onActionComplete($event)">
  </ejs-pivotview>`
})
export class AppComponent {
  onActionComplete(args: any) {
    if (args.actionName === 'Edited records saved') {
      console.log('Edit completed successfully');
      console.log('Action info:', args.actionInfo);
      // Show success notification
    }

    if (args.actionName === 'New record added') {
      console.log('Record added:', args.actionInfo);
      // Refresh related data
    }

    if (args.actionName === 'Record removed') {
      console.log('Record deleted successfully');
    }
  }
}
```

### ActionFailure Event

The `actionFailure` event is triggered when a UI action fails to produce the expected result.

**Event Parameters:**
- `actionName`: Name of the action that failed (Edit record, Save edited records, Add new record, Remove record)
- `errorInfo`: Error information of the failed action

```typescript

@Component({
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [editSettings]="editSettings"
    (actionFailure)="onActionFailure($event)">
  </ejs-pivotview>`
})
export class AppComponent {
  onActionFailure(args: any) {
    console.error('Action failed:', args.actionName);
    console.error('Error:', args.errorInfo);
    
    // Show error message to user
    alert(`Failed to ${args.actionName}: ${args.errorInfo}`);
  }
}
```

### Validation Before Save

Validate edited data before saving using the `actionBegin` event:

```typescript
onActionBegin(args: any) {
  if (args.actionName === 'Save edited records') {
    // Only validate newly added or modified records
    // Skip the validation check if needed
    if (this.validateEditedData(args) === false) {
      args.cancel = true;  // Prevent save
      alert('Validation failed. Please check your data.');
      return;
    }
  }
}

validateEditedData(args: any): boolean {
  // Implement custom validation
  // Return false to cancel the save operation
  return true;  // Data is valid
}
```

## Drill Through

### Enable Drill Through Feature

The drill-through feature allows users to view the raw, unaggregated data behind any aggregated cell in the pivot table. To enable this feature:

1. Set the `allowDrillThrough` property to **true**
2. Add the `DrillThroughService` to the providers

By double-clicking an aggregated cell, users can view its detailed raw data in a data grid displayed in a new window. The new window shows:
- Row header of the selected cell
- Column header of the selected cell
- Measure name of the selected cell
- Column chooser to include/exclude fields

```typescript
import { DrillThroughService, FieldListService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  selector: 'app-pivot',
  providers: [DrillThroughService, FieldListService],
  template: `<ejs-pivotview 
    #pivotGrid
    [dataSourceSettings]="dataSourceSettings"
    [allowDrillThrough]="true"
    (drillThrough)="onDrillThrough($event)">
  </ejs-pivotview>`
})
export class AppComponent implements OnInit {
  @ViewChild('pivotGrid') pivotGrid: PivotViewComponent;

  dataSourceSettings: IDataOptions = {
    dataSource: pivotData,
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
  };
}
```

### Drill Through with Pivot Chart

Users can access drill-through data through the pivot chart. By clicking on any data point in the pivot chart, they can view the raw data in a data grid displayed in a new window.

```typescript
import { PivotChartService, DrillThroughService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  providers: [PivotChartService, DrillThroughService],
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [chartSettings]="chartSettings"
    [allowDrillThrough]="true"
    (drillThrough)="onDrillThrough($event)">
  </ejs-pivotview>`
})
export class AppComponent {
  chartSettings: any = {
    chartSeries: { type: 'Column' }
  };

  onDrillThrough(args: any) {
    console.log('Drilled through from chart:', args.currentCell);
  }
}
```

### Maximum Rows to Retrieve

> **Note:** This property is applicable only for OLAP data sources.

The `maxRowsInDrillThrough` property specifies the maximum number of rows to be returned during a drill-through operation. By default, this is set to **"10000"**.

```typescript
import { DrillThroughService, CalculatedFieldService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  providers: [DrillThroughService, CalculatedFieldService],
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [allowDrillThrough]="true"
    [maxRowsInDrillThrough]="10">
  </ejs-pivotview>`
})
export class AppComponent {
  dataSourceSettings: IDataOptions = {
    catalog: 'Adventure Works DW 2008 SE',
    cube: 'Adventure Works',
    providerType: 'SSAS',
    url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
    rows: [
      { name: '[Customer].[Customer Geography]', caption: 'Customer Geography' }
    ],
    columns: [
      { name: '[Product].[Product Categories]', caption: 'Product Categories' },
      { name: '[Measures]', caption: 'Measures' }
    ],
    values: [
      { name: '[Measures].[Customer Count]', caption: 'Customer Count' },
      { name: '[Measures].[Internet Sales Amount]', caption: 'Internet Sales Amount' }
    ]
  };
}
```

## Drill Through Events

### DrillThrough Event

The `drillThrough` event is triggered immediately after a user double-clicks a value cell in the pivot table. This event allows users to customize the columns displayed in the drill-through popup's data grid.

**Event Parameters:**
- `columnHeaders`: Contains the column header of the clicked cell
- `currentCell`: Contains details about the clicked cell
- `currentTarget`: Contains the HTML element of the clicked cell
- `gridColumns`: Specifies the data grid columns to be displayed in the drill-through popup
- `rawData`: Contains the raw, unaggregated data for the clicked cell
- `rowHeaders`: Contains the row header of the clicked cell
- `value`: Contains the value of the clicked cell
- `cancel`: Set to **true** to prevent the dialog from being created

```typescript
import { DrillThroughService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  selector: 'app-pivot',
  providers: [DrillThroughService],
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [allowDrillThrough]="true"
    (drillThrough)="onDrillThrough($event)">
  </ejs-pivotview>`
})
export class AppComponent {
  dataSourceSettings: IDataOptions = {
    dataSource: pivotData,
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
  };

  onDrillThrough(args: any) {
    console.log('Current cell:', args.currentCell);
    console.log('Row headers:', args.rowHeaders);
    console.log('Column headers:', args.columnHeaders);
    console.log('Raw data:', args.rawData);
    
    // Customize grid columns if needed
    // args.gridColumns can be modified before display
  }
}
```

### BeginDrillThrough Event

The `beginDrillThrough` event fires right after the data grid is initialized in the drill-through popup. This event allows users to interact with the data grid and apply additional operations such as sorting, grouping, and filtering.

**Event Parameters:**
- `gridObj`: Holds the data grid instance to be rendered inside the drill-through popup
- `cellInfo`: Gives details about the clicked cell (rawData, rowHeaders, columnHeaders, value)

```typescript
import { DrillThroughService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  providers: [DrillThroughService],
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [allowDrillThrough]="true"
    (beginDrillThrough)="onBeginDrillThrough($event)">
  </ejs-pivotview>`
})
export class AppComponent {
  onBeginDrillThrough(args: any) {
    // args.gridObj is the Grid instance in the pop-up
    // Inject sort, filter, group modules for grid operations
    
    console.log('Grid initialized for drill-through');
    console.log('Cell info:', args.cellInfo);
    
    // Example: Enable sorting in the drill-through grid
    if (args.gridObj) {
      // Grid features can be configured here
      args.gridObj.allowSorting = true;
      args.gridObj.allowFiltering = true;
    }
  }
}
```

### Drill Through with Custom Layout

Customize the drill-through data by manipulating the grid columns in the `drillThrough` event:

```typescript
onDrillThrough(args: any) {
  // Filter or reorder columns in the drill-through view
  if (args.gridColumns) {
    // Show only specific columns
    args.gridColumns = args.gridColumns.filter((col: any) => 
      ['Region', 'Product', 'Sales', 'Quantity'].includes(col.field)
    );
  }
  
  // Exclude sensitive columns from display
  args.gridColumns = args.gridColumns.map((col: any) => {
    if (col.field === 'EmployeeSSN') {
      col.visible = false;  // Hide SSN column
    }
    return col;
  });
}
```
