---
name: Searching
description: 'Searching in Syncfusion Angular TreeGrid - global search across columns, column-level search.'
---

# Searching

Search functionality enables users to quickly find records across all columns or specific columns.

## When to Use

Use searching when you need to:
- **Global search** — Search across multiple columns at once
- **Real-time filtering** — Filter as users type in a search box
- **Quick data discovery** — Help users find records without complex filter UIs
- **Partial text matching** — Find records containing search terms
- **Search highlighting** — Highlight matching text in results
- **Hierarchical search** — Search across parent and child records
- **Combine with other features** — Use search alongside filtering and sorting

## Global Search

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
      [toolbar]='["Search"]'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='250'></e-column>
        <e-column field='Duration' headerText='Duration' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [ToolbarService]

})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;  
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
}
```
