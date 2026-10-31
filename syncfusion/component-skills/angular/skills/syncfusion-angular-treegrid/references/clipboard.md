---
name: Clipboard
description: 'Clipboard in Syncfusion Angular TreeGrid - copy and paste operations.'
---

# Clipboard

Clipboard functionality enables copy and paste operations with custom formatting options.

## When to Use

Use clipboard features when you need to:
- **Copy data** — Allow users to copy cells or rows
- **Paste data** — Enable pasting data into TreeGrid
- **Bulk data entry** — Paste from spreadsheets or other sources
- **Keyboard shortcuts** — Support Ctrl+C/Ctrl+V operations
- **Custom paste** — Handle special formatting on paste

## Copy and Paste

### Enable Copy

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent, ToolbarService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [childMapping]='childMapping'
      [toolbar]='toolbar'
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [ ToolbarService ]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
  public toolbar: Object[] = [{ text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' },
      { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
  public toolbarClick(args: ClickEventArgs): void {
    if(this.treegrid.getSelectedRecords().length>0) {
      let withHeader: boolean = false;
      if (args.item.id === 'copyHeader') {
          withHeader = true;
      }
      this.treegrid.copy(withHeader);
    } else {
      this.alertDialog.show();
    }
  }
}
```