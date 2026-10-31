# Events

Respond to spreadsheet user actions and lifecycle events using Angular event bindings.

## Table of Contents

- [Minimal code](#Minimal-code)
- [Component Class](#component-class)
- [Event Reference](#event-reference)
  - [Lifecycle Events](#lifecycle-events)
  - [Cell Editing Events](#cell-editing-events)
  - [CellEditEventArgs](#cellediteventargs)
  - [CellSaveEventArgs](#cellsaveeventargs)
  - [Selection Events](#selection-events)
  - [Formatting Events](#formatting-events)
  - [BeforeCellFormatArgs](#beforecellformatargs)
  - [DataSourceChangedEventArgs](#datasourcechangedeventargs)
  - [Save / Open Events](#save--open-events)
  - [BeforeSaveEventArgs](#beforesaveeventargs)
  - [SaveCompleteEventArgs](#savecompleteeventargs)
  - [OpenFailureArgs](#openfailureargs)
  - [Context Menu Events](#context-menu-events)
  - [File Menu Events](#file-menu-events)
  - [MenuSelectEventArgs](#menuselecteventargs)
  - [Action Events](#action-events)
  - [Sort Events](#sort-events)
  - [Dialog Events](#dialog-events)
  - [Cell Render / Query Events](#cell-render--query-events)
  - [CellInfoEventArgs](#cellinfoeventargs)
- [Notes](#notes)

## Minimal code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import {
  CellEditEventArgs,
  CellSaveEventArgs,
  BeforeSelectEventArgs,
  SelectEventArgs,
  BeforeCellFormatArgs,
  BeforeSaveEventArgs,
  SaveCompleteEventArgs,
  OpenFailureArgs,
  BeforeOpenCloseMenuEventArgs,
  MenuSelectEventArgs,
  BeforeSortEventArgs,
  SortEventArgs,
  DialogBeforeOpenEventArgs,
  CellInfoEventArgs,
  CellRenderEventArgs,
  BeforeCellUpdateArgs,
  DataSourceChangedEventArgs,
  ConditionalFormatEventArgs
} from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet
    (created)="onCreated()"
    (dataBound)="onDataBound($event)"
    (beforeDataBound)="onBeforeDataBound($event)"
    (cellEdit)="onCellEdit($event)"
    (cellEditing)="onCellEditing($event)"
    (cellEdited)="onCellEdited($event)"
    (cellSave)="onCellSave($event)"
    (beforeSelect)="onBeforeSelect($event)"
    (select)="onSelect($event)"
    (beforeCellFormat)="onBeforeCellFormat($event)"
    (beforeConditionalFormat)="onBeforeConditionalFormat($event)"
    (dataSourceChanged)="onDataSourceChanged($event)"
    (beforeSave)="onBeforeSave($event)"
    (saveComplete)="onSaveComplete($event)"
    (beforeOpen)="onBeforeOpen($event)"
    (openComplete)="onOpenComplete($event)"
    (openFailure)="onOpenFailure($event)"
    (contextMenuBeforeOpen)="onContextMenuBeforeOpen($event)"
    (contextMenuItemSelect)="onContextMenuItemSelect($event)"
    (contextMenuBeforeClose)="onContextMenuBeforeClose($event)"
    (fileMenuBeforeOpen)="onFileMenuBeforeOpen($event)"
    (fileMenuItemSelect)="onFileMenuItemSelect($event)"
    (actionBegin)="onActionBegin($event)"
    (actionComplete)="onActionComplete($event)"
    (beforeSort)="onBeforeSort($event)"
    (sortComplete)="onSortComplete($event)"
    (dialogBeforeOpen)="onDialogBeforeOpen($event)"
    (queryCellInfo)="onQueryCellInfo($event)"
    (beforeCellRender)="onBeforeCellRender($event)"
    (beforeCellUpdate)="onBeforeCellUpdate($event)">
    <e-sheets>
      <e-sheet name="Sheet1"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  // === Lifecycle Events ===

  // Fires when component is fully created — safe for post-init operations
  onCreated(): void {
    console.log('Spreadsheet initialized');
  }

  // Fires when data binding is starting
  onBeforeDataBound(args: any): void {
    console.log('Data binding starting...');
  }

  // Fires when data is loaded into sheet
  onDataBound(args: any): void {
    console.log('Data bound, rows:', this.spreadsheet.sheets[0].rows?.length);
  }

  // === Cell Editing Events ===

  // Fires when user starts editing a cell
  onCellEdit(args: CellEditEventArgs): void {
    console.log(`Editing ${args.address}: ${args.value}`);
    // args.cancel = true; // prevent editing
  }

  // Fires every keystroke while editing
  onCellEditing(args: CellEditEventArgs): void {
    // Allow only numeric input
    if (!/^\d*\.?\d*$/.test(args.value as string)) {
      args.cancel = true;
    }
  }

  // Fires after user finishes editing (before save)
  onCellEdited(args: CellEditEventArgs): void {
    console.log(`Cell edited: ${args.address} | New: ${args.value} | Old: ${args.oldValue}`);
  }

  // Fires before cell value is saved — can cancel
  onCellSave(args: CellSaveEventArgs): void {
    if (args.value === '') {
      args.cancel = true; // prevent empty save
    }
  }

  // === Selection Events ===

  // Fires before selection — can cancel
  onBeforeSelect(args: BeforeSelectEventArgs): void {
    if (args.range === 'A1:Z1') {
      args.cancel = true; // prevent header row selection
    }
  }

  // Fires after selection changes
  onSelect(args: SelectEventArgs): void {
    console.log('Selected range:', args.range);
  }

  // === Formatting Events ===

  // Fires before formatting is applied — can cancel
  onBeforeCellFormat(args: BeforeCellFormatArgs): void {
    if (args.style.backgroundColor === '#FF0000') {
      args.cancel = true; // prevent red background
    }
  }

  // Fires before conditional formatting is applied
  onBeforeConditionalFormat(args: ConditionalFormatEventArgs): void {
    console.log('Applying conditional format to:', args.range);
  }

  // Fires when data source changes (add/edit/delete)
  onDataSourceChanged(args: DataSourceChangedEventArgs): void {
    console.log('Action:', args.action); // 'Add' | 'Update' | 'Delete'
    console.log('Data:', args.data);
  }

  // === Save/Open Events ===

  // Fires before save
  onBeforeSave(args: BeforeSaveEventArgs): void {
    console.log('Saving as:', args.saveType); // 'Xlsx' | 'Csv' | 'Pdf'
    // args.cancel = true; // cancel save
    args.needBlobData = true;  // receive blob in saveComplete
    args.isFullPost   = false; // return blob instead of full POST
  }

  // Fires after save completes
  onSaveComplete(args: SaveCompleteEventArgs): void {
    console.log('Save status:', args.status); // 'Success' | 'Failure'
    console.log('Blob data:', args.blobData); // available when needBlobData: true
  }

  // Fires before file open
  onBeforeOpen(args: any): void {
    console.log('Before opening file');
  }

  // Fires after file is opened
  onOpenComplete(args: any): void {
    console.log('File opened successfully');
  }

  // Fires if file open fails
  onOpenFailure(args: OpenFailureArgs): void {
    console.error('Failed to open:', args.error);
  }

  // === Context Menu Events ===

  // Fires before context menu opens
  onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    console.log('Context menu opening');
  }

  // Fires when context menu item is clicked
  onContextMenuItemSelect(args: MenuSelectEventArgs): void {
    if (args.text === 'Copy') {
      console.log('Copy selected');
    }
  }

  // Fires before context menu closes
  onContextMenuBeforeClose(args: BeforeOpenCloseMenuEventArgs): void {
    console.log('Context menu closing');
  }

  // === File Menu Events ===

  // Fires before File menu opens
  onFileMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    console.log('File menu opening');
  }

  // Fires when File menu item is clicked
  onFileMenuItemSelect(args: MenuSelectEventArgs): void {
    if (args.text === 'Save') {
      console.log('Save clicked');
    }
  }

  // === Action Events ===

  // Fires before any action (sort, filter, format, etc.)
  onActionBegin(args: any): void {
    if (args.action === 'sort') {
      console.log('Sorting starting...');
      // args.cancel = true; // prevent action
    }
  }

  // Fires after any action completes
  onActionComplete(args: any): void {
    console.log('Action completed:', args.action);
  }

  // === Sort Events ===

  // Fires before sorting
  onBeforeSort(args: BeforeSortEventArgs): void {
    console.log('Sort range:', args.range);
    // args.cancel = true; // cancel sort
  }

  // Fires after sorting completes
  onSortComplete(args: SortEventArgs): void {
    console.log('Sort done:', args.sortOptions);
  }

  // === Dialog Events ===

  // Fires before any dialog opens
  onDialogBeforeOpen(args: DialogBeforeOpenEventArgs): void {
    console.log('Dialog:', args.dialogName); // 'insert', 'Format Cells', etc.
    // args.cancel = true; // prevent dialog
  }

  // === Cell Render / Query Events ===

  // Fires for every cell during rendering — performance-sensitive
  onQueryCellInfo(args: CellInfoEventArgs): void {
    if (args.rowIndex === 0) {
      args.cell.style = { fontWeight: 'bold' }; // bold header row
    }
  }

  // Fires before cell is appended to DOM
  onBeforeCellRender(args: CellRenderEventArgs): void {
    console.log('Rendering cell:', args.colIndex, args.rowIndex);
  }

  // Fires before cell properties change
  onBeforeCellUpdate(args: BeforeCellUpdateArgs): void {
    console.log('Cell updating');
  }
}
```

## Event Reference

### Lifecycle Events

| Event | Args Type | Cancellable | Description |
|---|---|---|---|
| `(created)` | `void` | ❌ | Component fully created and ready |
| `(beforeDataBound)` | `any` | ❌ | Data binding is starting |
| `(dataBound)` | `any` | ❌ | Data is loaded into sheet |

### Cell Editing Events

| Event | Args Type | Cancellable | Description |
|---|---|---|---|
| `(cellEdit)` | `CellEditEventArgs` | ✅ | User starts editing a cell |
| `(cellEditing)` | `CellEditEventArgs` | ✅ | Fires every keystroke while editing |
| `(cellEdited)` | `CellEditEventArgs` | ❌ | User finishes editing (before save) |
| `(cellSave)` | `CellSaveEventArgs` | ✅ | Before cell value is saved to grid |

### CellEditEventArgs

| Property | Type | Description |
|---|---|---|
| `address` | `string` | Cell address e.g. `'B2'` |
| `value` | `any` | Current cell value |
| `oldValue` | `any` | Previous cell value |
| `cancel` | `boolean` | Set `true` to cancel |

### CellSaveEventArgs

| Property | Type | Description |
|---|---|---|
| `address` | `string` | Cell address |
| `value` | `any` | Value to be saved |
| `cancel` | `boolean` | Set `true` to prevent save |

### Selection Events

| Event | Args Type | Cancellable | Description |
|---|---|---|---|
| `(beforeSelect)` | `BeforeSelectEventArgs` | ✅ | Before cell/range is selected |
| `(select)` | `SelectEventArgs` | ❌ | After cell/range is selected |

| Property | Type | Description |
|---|---|---|
| `args.range` | `string` | Selected range e.g. `'A1:D10'` |
| `args.cancel` | `boolean` | Set `true` to block selection (beforeSelect only) |

### Formatting Events

| Event | Args Type | Cancellable | Description |
|---|---|---|---|
| `(beforeCellFormat)` | `BeforeCellFormatArgs` | ✅ | Before formatting applied to cells |
| `(beforeConditionalFormat)` | `ConditionalFormatEventArgs` | ✅ | Before conditional format applied |
| `(dataSourceChanged)` | `DataSourceChangedEventArgs` | ❌ | Data source row added/updated/deleted |

### BeforeCellFormatArgs

| Property | Type | Description |
|---|---|---|
| `range` | `string` | Target range |
| `style` | `CellStyleModel` | Formatting being applied |
| `cancel` | `boolean` | Set `true` to prevent formatting |

### DataSourceChangedEventArgs

| Property | Type | Description |
|---|---|---|
| `action` | `string` | `'Add'`, `'Update'`, `'Delete'` |
| `data` | `any` | Changed row data |

### Save / Open Events

| Event | Args Type | Cancellable | Description |
|---|---|---|---|
| `(beforeSave)` | `BeforeSaveEventArgs` | ✅ | Before spreadsheet is saved |
| `(saveComplete)` | `SaveCompleteEventArgs` | ❌ | After save completes |
| `(beforeOpen)` | `any` | ✅ | Before file is opened |
| `(openComplete)` | `any` | ❌ | After file is opened |
| `(openFailure)` | `OpenFailureArgs` | ❌ | If file open fails |

### BeforeSaveEventArgs

| Property | Type | Description |
|---|---|---|
| `saveType` | `string` | `'Xlsx'`, `'Csv'`, `'Pdf'` |
| `url` | `string` | Save endpoint URL |
| `needBlobData` | `boolean` | Set `true` to receive blob in `saveComplete` |
| `isFullPost` | `boolean` | Set `false` to return blob instead of full POST |
| `cancel` | `boolean` | Set `true` to cancel save |

### SaveCompleteEventArgs

| Property | Type | Description |
|---|---|---|
| `status` | `string` | `'Success'` or `'Failure'` |
| `blobData` | `Blob` | Available when `needBlobData: true` and `isFullPost: false` |

### OpenFailureArgs

| Property | Type | Description |
|---|---|---|
| `error` | `string` | Error message |

### Context Menu Events

| Event | Args Type | Cancellable | Description |
|---|---|---|---|
| `(contextMenuBeforeOpen)` | `BeforeOpenCloseMenuEventArgs` | ✅ | Before context menu opens |
| `(contextMenuItemSelect)` | `MenuSelectEventArgs` | ❌ | Context menu item clicked |
| `(contextMenuBeforeClose)` | `BeforeOpenCloseMenuEventArgs` | ❌ | Before context menu closes |

### File Menu Events

| Event | Args Type | Cancellable | Description |
|---|---|---|---|
| `(fileMenuBeforeOpen)` | `BeforeOpenCloseMenuEventArgs` | ✅ | Before File menu opens |
| `(fileMenuItemSelect)` | `MenuSelectEventArgs` | ❌ | File menu item clicked |

### MenuSelectEventArgs

| Property | Type | Description |
|---|---|---|
| `text` | `string` | Clicked item label e.g. `'Copy'`, `'Save'` |

### Action Events

| Event | Args Type | Cancellable | Description |
|---|---|---|---|
| `(actionBegin)` | `any` | ✅ | Before any action (sort, filter, format, etc.) |
| `(actionComplete)` | `any` | ❌ | After any action completes |

| Property | Type | Description |
|---|---|---|
| `args.action` | `string` | Action type e.g. `'sort'`, `'filter'`, `'format'` |
| `args.cancel` | `boolean` | Set `true` to prevent action (`actionBegin` only) |

### Sort Events

| Event | Args Type | Cancellable | Description |
|---|---|---|---|
| `(beforeSort)` | `BeforeSortEventArgs` | ✅ | Before sorting begins |
| `(sortComplete)` | `SortEventArgs` | ❌ | After sorting completes |

| Property | Type | Description |
|---|---|---|
| `args.range` | `string` | Sort range |
| `args.sortOptions` | `SortOptions` | Sort configuration |
| `args.cancel` | `boolean` | Set `true` to cancel (`beforeSort` only) |

### Dialog Events

| Event | Args Type | Cancellable | Description |
|---|---|---|---|
| `(dialogBeforeOpen)` | `DialogBeforeOpenEventArgs` | ✅ | Before any dialog opens |

| Property | Type | Description |
|---|---|---|
| `args.dialogName` | `string` | Dialog type e.g. `'insert'`, `'Format Cells'` |
| `args.cancel` | `boolean` | Set `true` to prevent dialog |

### Cell Render / Query Events

| Event | Args Type | Cancellable | Description |
|---|---|---|---|
| `(queryCellInfo)` | `CellInfoEventArgs` | ❌ | Fires for every cell during rendering |
| `(beforeCellRender)` | `CellRenderEventArgs` | ❌ | Before cell is appended to DOM |
| `(beforeCellUpdate)` | `BeforeCellUpdateArgs` | ❌ | Before cell properties change |

### CellInfoEventArgs

| Property | Type | Description |
|---|---|---|
| `cell` | `CellModel` | Cell object — modify `cell.style` to customize rendering |
| `rowIndex` | `number` | Row index (0-based) |
| `colIndex` | `number` | Column index (0-based) |

## Notes

- `(created)` is the safe entry point for all post-init operations (formulas, formatting, etc.)
- `(queryCellInfo)` fires for every visible cell — avoid heavy operations inside it
- Setting `args.cancel = true` silently prevents the action — no error is shown to the user
- `(cellSave)` and `(cellEdited)` are distinct — `cellEdited` fires before save; `cellSave` fires during save
- `(actionBegin)` covers many actions — check `args.action` to target a specific one