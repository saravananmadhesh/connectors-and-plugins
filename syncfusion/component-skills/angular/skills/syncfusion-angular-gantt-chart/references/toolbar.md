# Toolbar in Angular Gantt Chart

## Table of Contents
- [Enable Toolbar](#enable-toolbar)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Handle Toolbar Clicks](#handle-toolbar-clicks)
- [Toolbar Template](#toolbar-template)
- [Enable/Disable Toolbar Items](#enabledisable-toolbar-items)

---

## Enable Toolbar

Inject `ToolbarService` and set the `toolbar` property:

```typescript
@Component({
  providers: [ToolbarService],
  template: `<ejs-gantt [toolbar]="toolbar"></ejs-gantt>`
})
export class AppComponent {
  public toolbar: string[] = ['Add', 'Edit', 'Delete', 'ExpandAll', 'CollapseAll', 'Search'];
}
```

---

## Built-in Toolbar Items

| Item | Action |
|------|--------|
| `'Add'` | Opens add task dialog / inserts new row |
| `'Edit'` | Opens edit dialog for selected task |
| `'Update'` | Saves cell edit changes |
| `'Delete'` | Deletes selected task |
| `'Cancel'` | Cancels current edit |
| `'ExpandAll'` | Expands all parent rows |
| `'CollapseAll'` | Collapses all parent rows |
| `'Search'` | Shows search input box |
| `'Indent'` | Makes selected task a child |
| `'Outdent'` | Promotes selected task up one level |
| `'PrevTimeSpan'` | Navigates timeline to previous period |
| `'NextTimeSpan'` | Navigates timeline to next period |
| `'ZoomIn'` | Increases timeline detail level |
| `'ZoomOut'` | Decreases timeline detail level |
| `'ZoomToFit'` | Fits entire project in visible area |
| `'ExcelExport'` | Exports to Excel (requires ExcelExportService) |
| `'PdfExport'` | Exports to PDF (requires PdfExportService) |
| `'CriticalPath'` | Toggles critical path visibility |
| `'Undo'` | Undoes last action (requires UndoRedoService) |
| `'Redo'` | Redoes last undone action (requires UndoRedoService) |
| `'SplitTask'` | Splits selected task into segments (requires EditService) |
| `'MergeTask'` | Merges selected split task back into one (requires EditService) |
| `'ColumnChooser'` | Opens column visibility chooser dialog (requires ColumnMenuService) |

> **Service requirements:** Some toolbar items require specific services injected in `providers`. `UndoRedoService` for `Undo`/`Redo`, `EditService` for `SplitTask`/`MergeTask`, `ColumnMenuService` for `ColumnChooser`, `ExcelExportService` for `ExcelExport`/`CsvExport`, `PdfExportService` for `PdfExport`.

---

## Custom Toolbar Items

Add custom buttons with the `ItemModel` format:

```typescript
public toolbar: object[] = [
  'Add', 'Edit', 'Delete',
  { type: 'Separator' },       // Visual divider
  {
    text: 'Refresh',
    tooltipText: 'Refresh Data',
    id: 'refreshBtn',
    prefixIcon: 'e-refresh'    // Syncfusion icon class
  },
  {
    text: 'Export PDF',
    tooltipText: 'Export to PDF',
    id: 'exportPdfBtn',
    align: 'Right'             // 'Left' | 'Center' | 'Right'
  }
];
```

---

## Handle Toolbar Clicks

```typescript
public toolbarClick(args: any): void {
  if (args.item.id === 'refreshBtn') {
    // Custom logic for refresh button
    this.loadData();
  }
  if (args.item.id === 'exportPdfBtn') {
    this.ganttObj.pdfExport();
  }
  // Override built-in actions
  if (args.item.text === 'Add') {
    args.cancel = true;  // Prevent default add behavior
    this.openCustomAddDialog();
  }
}
```

```html
<ejs-gantt (toolbarClick)="toolbarClick($event)"></ejs-gantt>
```

---

## Toolbar Template

Replace a toolbar item with a custom Angular component:

```typescript
public toolbar: object[] = [
  {
    text: '',
    id: 'customDropdown',
    template: '#customDropdownTemplate'
  }
];
```

---

## Enable/Disable Toolbar Items

```typescript
// Disable specific items
this.ganttObj.toolbarModule.enableItems(['Add', 'Delete'], false);

// Re-enable
this.ganttObj.toolbarModule.enableItems(['Add', 'Delete'], true);
```

Useful for permission-based UI (e.g., hide edit controls for read-only users).
