---
name: Row-drag-drop
description: 'Row Drag and Drop in Syncfusion Angular TreeGrid - hierarchical drag-drop, parent-child updates, drop constraints, and event handling.'
---

# Row Drag and Drop (Hierarchical)

Enable users to reorganize TreeGrid rows and update parent-child relationships through drag-and-drop.

## When to Use

Use drag-and-drop when you need to:
- **Reorder rows** — Allow users to reorganize data via dragging
- **Move between groups** — Drag rows to different parent groups
- **Reorganize hierarchy** — Change parent-child relationships
- **Intuitive editing** — Provide natural drag-based workflow
- **Visual feedback** — Show drop targets and drag indicators
- **Drop constraints** — Validate drag-drop operations
- **Event handling** — Execute custom logic on drops

## Table of Contents
- [Enable Drag and Drop](#enable-drag-and-drop)
- [Hierarchical Constraints](#hierarchical-constraints)
- [Drop Events and Validation](#drop-events-and-validation)
- [Visual Feedback](#visual-feedback)

## Enable Drag and Drop

### Basic Drag-Drop Setup

```typescript
import { Component } from '@angular/core';
import { EditService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [childMapping]='childMapping'
      [allowRowDragAndDrop]='true'
      (rowDragStart)='onDragStart($event)'
      (rowDrag)='onDrag($event)'
      (rowDrop)='onDrop($event)'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
        <e-column field='Duration' headerText='Duration' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [EditService]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;

  public data: Object[] = [
    {
      TaskID: 1,
      TaskName: 'Project Planning',
      Duration: 5,
      ParentID: null,
      subtasks: [
        { TaskID: 2, TaskName: 'Scope', Duration: 2, ParentID: 1 },
        { TaskID: 3, TaskName: 'Budget', Duration: 2, ParentID: 1 }
      ]
    },
    {
      TaskID: 4,
      TaskName: 'Implementation',
      Duration: 8,
      ParentID: null,
      subtasks: []
    }
  ];

  public childMapping: string = 'subtasks';
  private draggedRecord: any = null;

  onDragStart(args: any) {
    console.log('Drag started:', args.rowData.TaskName);
  }

  onDrag(args: any) {
    // Visual feedback during drag
    console.log('Dragging over:', args.dropTarget);
  }

  onDrop(args: any) {
    console.log('Dropped on:', args.dropTarget.rowData?.TaskName);
  }
}
```

---

## Hierarchical Constraints

### Prevent Invalid Drops

```typescript
onDrop(args: any) {
  const draggedRecord = args.draggedRecords[0];
  const targetRecord = args.dropTarget.rowData;
  
  // Constraint 1: Cannot drop on itself
  if (draggedRecord.TaskID === targetRecord.TaskID) {
    args.cancel = true;
    console.warn('Cannot drop task on itself');
    return;
  }

  // Constraint 2: Cannot create circular hierarchy
  if (this.isCircularHierarchy(draggedRecord, targetRecord)) {
    args.cancel = true;
    console.warn('Cannot create circular hierarchy');
    return;
  }

  // Constraint 3: Cannot exceed max hierarchy depth
  if (this.getHierarchyDepth(targetRecord) >= 5) {
    args.cancel = true;
    console.warn('Maximum hierarchy depth exceeded');
    return;
  }

  // Constraint 4: Cannot drop on archived/locked records
  if (targetRecord.Status === 'Archived' || targetRecord.Locked) {
    args.cancel = true;
    console.warn('Cannot drop on archived/locked record');
    return;
  }

  // All constraints passed - proceed with drop
  this.updateHierarchy(draggedRecord, targetRecord);
}

isCircularHierarchy(draggedRecord: any, targetRecord: any): boolean {
  // Check if targetRecord is a child of draggedRecord
  const isChild = this.isChildOf(targetRecord, draggedRecord);
  return isChild;
}

isChildOf(record: any, potentialParent: any): boolean {
  if (record.ParentID === potentialParent.TaskID) {
    return true;
  }
  
  if (record.subtasks && record.subtasks.length > 0) {
    return record.subtasks.some((child: any) => 
      this.isChildOf(child, potentialParent)
    );
  }
  
  return false;
}

getHierarchyDepth(record: any, depth: number = 0): number {
  if (!record.ParentID) {
    return depth;
  }
  
  const parent = this.findRecord(record.ParentID);
  if (parent) {
    return this.getHierarchyDepth(parent, depth + 1);
  }
  
  return depth;
}

findRecord(taskID: number): any {
  // Search through flattened data structure
  const search = (records: any[]): any => {
    for (const record of records) {
      if (record.TaskID === taskID) return record;
      if (record.subtasks) {
        const found = search(record.subtasks);
        if (found) return found;
      }
    }
    return null;
  };
  
  return search(this.data);
}
```

### Drop Position Constraints

```typescript
onDrop(args: any) {
  const dropIndicator = args.dropIndicator;  // 'above', 'below', or 'child'
  
  // Example: Prevent dropping as direct child of certain record types
  if (dropIndicator === 'child') {
    const targetRecord = args.dropTarget.rowData;
    
    if (targetRecord.Type === 'Phase' && this.getChildCount(targetRecord) >= 20) {
      args.cancel = true;
      console.warn('Cannot add more tasks to this phase');
      return;
    }
  }
}
```

---

## Drop Events and Validation

### Comprehensive Drop Handling

```typescript
@Component({
  selector: 'app-treegrid',
  template: `
    <div class='drag-drop-notification'>
      {{ notificationMessage }}
    </div>
    
    <ejs-treegrid 
      (rowDrop)='onRowDrop($event)'>
      <!-- columns -->
    </ejs-treegrid>
  `
})
export class AppComponent {
  notificationMessage = '';

  onRowDrop(args: any) {
    // Before drop - validation phase
    const draggedRecord = args.draggedRecords[0];
    const targetRecord = args.dropTarget.rowData;
    
    console.log(`Dropping "${draggedRecord.TaskName}" onto "${targetRecord.TaskName}"`);
    
    // Validation
    if (!this.validateDrop(draggedRecord, targetRecord, args.dropIndicator)) {
      args.cancel = true;
      this.notificationMessage = '❌ Invalid drop operation';
      return;
    }
    
    this.notificationMessage = `📦 Moving "${draggedRecord.TaskName}"...`;
  }

  validateDrop(
    draggedRecord: any,
    targetRecord: any,
    dropIndicator: string
  ): boolean {
    // Self-drop check
    if (draggedRecord.TaskID === targetRecord.TaskID) return false;
    
    // Circular hierarchy check
    if (this.isCircularHierarchy(draggedRecord, targetRecord)) return false;
    
    // Depth check
    if (this.getHierarchyDepth(targetRecord) >= 5) return false;
    
    // Status check
    if (targetRecord.Status === 'Locked') return false;
    
    return true;
  }

  persistHierarchyChange(draggedRecord: any, targetRecord: any): Observable<any> {
    return this.http.post('/api/tasks/move', {
      taskID: draggedRecord.TaskID,
      newParentID: targetRecord.TaskID,
      timestamp: new Date()
    });
  }
}
```

---

## Visual Feedback

### Enhanced Drag-Drop UI

```typescript
@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [allowRowDragandDrop]='true'
      (dragStart)='onDragStart($event)'
      (drop)='onDrop($event)'
      (dragStop)='onDragStop($event)'>
      <e-columns>
        <e-column field='TaskName' headerText='Task Name' width='200'>
          <ng-template #template let-data>
            <div class='task-cell'>
              <span class='drag-handle' title='Drag to reorder'>⋮⋮</span>
              <span class='task-name'>{{ data.TaskName }}</span>
              <span *ngIf='data.subtasks?.length' class='child-count'>
                ({{ data.subtasks.length }} subtasks)
              </span>
            </div>
          </ng-template>
        </e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  styles: [`
    .task-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .drag-handle {
      cursor: grab;
      color: #999;
      font-weight: bold;
      padding: 0 4px;
    }

    .drag-handle:active {
      cursor: grabbing;
      color: #333;
    }

    .child-count {
      color: #888;
      font-size: 12px;
      margin-left: auto;
    }

    .e-treegrid .e-row.dragging {
      opacity: 0.5;
      background-color: #f0f0f0;
    }

    .e-treegrid .e-row.drag-over-target {
      background-color: #e3f2fd;
      border: 2px solid #2196f3;
    }

    .e-treegrid .e-row.drag-over-child {
      background-color: #f3e5f5;
      border-left: 4px solid #9c27b0;
    }
  `]
})
export class AppComponent {
  onDragStart(args: any) {
    args.row.classList.add('dragging');
  }

  onDrop(args: any) {
    const dropTarget = args.dropTarget;
    
    if (args.dropIndicator === 'child') {
      dropTarget.classList.add('drag-over-child');
    } else {
      dropTarget.classList.add('drag-over-target');
    }
  }

  onDragStop(args: any) {
    args.row?.classList.remove('dragging');
    args.dropTarget?.classList.remove('drag-over-target', 'drag-over-child');
  }
}
```

---

## Best Practices

1. **Always Validate** - Check constraints before allowing drop
2. **Provide Feedback** - Show visual indicators during drag
3. **Persist Changes** - Save to backend immediately after drop
4. **Rollback on Error** - Refresh grid if persistence fails
5. **Handle Permissions** - Check user rights before allowing move
6. **Limit Depth** - Prevent overly deep hierarchies
7. **Test Edge Cases** - Multiple children, archive states, etc.
