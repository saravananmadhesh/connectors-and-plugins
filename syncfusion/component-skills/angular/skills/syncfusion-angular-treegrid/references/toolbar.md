---
name: Toolbar
description: 'Toolbar in Syncfusion Angular TreeGrid - built-in toolbar items, custom toolbar items, item alignment, toolbar events, and event handling.'
---

# Toolbar

Toolbar provides quick access to frequently used actions and custom functionality.

## When to Use

Use toolbar when you need to:
- **Add action buttons** — Provide quick access to CRUD operations
- **Export functionality** — Export data to Excel, PDF, CSV
- **Print options** — Enable print-friendly view
- **Search interface** — Add global search to toolbar
- **Custom buttons** — Create custom action buttons
- **Toolbar styling** — Customize toolbar appearance
- **Responsive toolbar** — Adapt toolbar for different screen sizes

## Table of Contents
- [Toolbar Rules](#toolbar-rules)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Toolbar Events](#toolbar-events)

## Toolbar Rules
 
### Rule 1: TreeGridComponent ID is REQUIRED for Toolbar Click Events (Export/Import)
 
When using toolbar click events to handle export (Excel, PDF) or custom actions, you **MUST** provide an `id` attribute on the `<ejs-treegrid>` element. This ID is required for toolbar button clicks to locate the grid instance.

❌ **WRONG** - No ID provided on grid:
```typescript
// Component
export class TreeGridComponent {
  data = [{ OrderID: 10248, CustomerName: 'VINET' }];
  
  onToolbarClick(args: ToolbarClickEventArgs) {
    // Grid cannot be found by toolbar button click
  }
}
```

```html
<!-- Template - No ID attribute -->
<ejs-treegrid [dataSource]="data" 
          [toolbar]="['ExcelExport', 'PdfExport']"
          (toolbarClick)="onToolbarClick($event)">
  <!-- columns -->
</ejs-treegrid>
```

✅ **CORRECT** - ID attribute provided on grid:
```typescript
// Component
export class TreeGridComponent {
  @ViewChild('grid') grid!: TreeGridComponent;
  
  data = [{ OrderID: 10248, CustomerName: 'VINET' }];
  
  onToolbarClick(args: ToolbarClickEventArgs) {
    if (args.item?.id === this.grid?.id + '_excelexport') {
      this.grid.excelExport();
    }
  }
}
```

```html
<!-- Template - ID attribute required -->
<ejs-treegrid #treegrid
          id="treegrid" 
          [toolbar]="['ExcelExport', 'PdfExport']"
          (toolbarClick)="onToolbarClick($event)">
  <!-- columns -->
</ejs-treegrid>
```

## Built-in Toolbar Items

### Standard Toolbar

```typescript
import { Component } from '@angular/core';
import { ToolbarService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [toolbar]='toolbarItems'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [ToolbarService]
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';

  public toolbarItems = [
    'Add', 'Edit', 'Delete', 'Update', 'Cancel',
    'Search', 'ExcelExport', 'PdfExport', 'Print'
  ];
}
```

## Custom Toolbar Items

### Custom Button

```typescript
public toolbarItems = [
  'Add', 'Edit', 'Delete',
  { text: 'Custom Action', tooltipText: 'Custom', id: 'customcmd' }
];
```

## Toolbar Events

### Toolbar Click Event

```typescript
<ejs-treegrid 
  (toolbarClick)='onToolbarClick($event)'
  (beforePrint)='onBeforePrint($event)'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
onToolbarClick(args: any) {
  console.log('Toolbar item clicked:', args.item);
}

onBeforePrint(args: any) {
  console.log('Print initiated from toolbar');
}
```