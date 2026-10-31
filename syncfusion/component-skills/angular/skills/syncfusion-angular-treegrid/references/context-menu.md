---
name: Context-menu
description: 'Context menu in Syncfusion Angular TreeGrid - context menu configuration, built-in menu items, custom menu items, and menu event handling.'
---

# Context Menu

Context menu provides quick actions when right-clicking on rows or cells.

## When to Use

Use context menu when you need to:
- **Quick actions** — Right-click menu for common operations
- **CRUD operations** — Edit, delete, copy from menu
- **Custom menus** — Add domain-specific menu items
- **Conditional items** — Show/hide menu items based on context
- **Copy to clipboard** — Copy cell or row data via menu
- **Row operations** — Actions specific to selected row
- **Touch-friendly** — Alternative to right-click on touch devices

## Table of Contents
- [Enable Context Menu](#enable-context-menu)
- [Context Menu Items](#context-menu-items)
- [Menu Events](#menu-events)

## Enable Context Menu

### Basic Context Menu

```typescript
import { Component } from '@angular/core';
import { ContextMenuService, ExcelExportService, EditService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [contextMenuItems]='contextMenuItems'
      [editSettings]='editing'
      [toolbar]="toolbar"
      allowExcelExport='true'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [ContextMenuService, ExcelExportService, EditService, ToolbarService]
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
  public editing: EditSettingsModel = [ { allowDeleting: true, allowEditing: true, mode: 'Row' } ];
  public contextMenuItems = [
    'Edit', 'Delete', 'Copy', 'ExcelExprt'
  ];
}
```

## Context Menu Items

### Built-in Items

```typescript
public contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending', 'Edit', 'Delete', 'Save', 'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage', 'LastPage', 'NextPage', 'Indent', 'Outdent'];
```

### Custom Menu Items

```typescript
public contextMenuItems = [
  'Edit', 'Delete',
  { text: 'Custom Action', id: 'customcmd', target: '.e-content' }
];
```

## Menu Events

### Context Menu Click

```typescript
<ejs-treegrid 
  (contextMenuClick)='onContextMenuClick($event)'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
onContextMenuClick(args: any) {
  if (args.item.id === 'customcmd') {
    console.log('Custom context menu clicked');
    console.log('Target data:', args.rowData);
  }
}
```