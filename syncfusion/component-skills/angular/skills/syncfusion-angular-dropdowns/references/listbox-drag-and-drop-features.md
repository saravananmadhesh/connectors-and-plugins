# Drag-and-Drop Features in Syncfusion Angular ListBox

## Overview

The ListBox component supports dragging items within the same list or between multiple lists. This enables intuitive reordering and item transfer patterns without writing complex drag-and-drop logic.

## Single ListBox Drag-and-Drop

Enable drag-and-drop reordering within a single ListBox:

### Enable Drag-and-Drop

Set `allowDragAndDrop` property to `true`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-single-dnd',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <ejs-listbox 
      [dataSource]="items"
      [allowDragAndDrop]="true"
      height="300px">
    </ejs-listbox>
  `
})
export class SingleDndComponent implements OnInit {
  public items: any[] = [];

  ngOnInit(): void {
    this.items = [
      { text: 'Priority 1', id: '1' },
      { text: 'Priority 2', id: '2' },
      { text: 'Priority 3', id: '3' },
      { text: 'Priority 4', id: '4' },
      { text: 'Priority 5', id: '5' }
    ];
  }
}
```

### User Interaction

- **Click and hold** an item to start dragging
- **Drag** the item to a new position
- **Drop** to reorder (a line indicator shows insertion point)
- **Multiple items**: Drag a selected item to move all selected items together

### Real-World Example: Task Priority Reordering

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-priority-list',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <div style="padding: 20px;">
      <h3>Reorder Tasks by Priority</h3>
      <p style="color: #666;">Drag items to reorder. Selected tasks move together.</p>
      
      <ejs-listbox 
        #taskList
        [dataSource]="tasks"
        [selectionSettings]="{ mode: 'Multiple' }"
        [allowDragAndDrop]="true"
        (drop)="onTasksReordered()"
        height="350px">
      </ejs-listbox>
      
      <div style="margin-top: 20px;">
        <button (click)="savePriorities()">Save Priority Order</button>
      </div>
    </div>
  `
})
export class PriorityListComponent implements OnInit {
  @ViewChild('taskList') listbox: any;
  
  public tasks: any[] = [];

  ngOnInit(): void {
    this.tasks = [
      { text: 'Fix critical bug', id: 't1', priority: 1 },
      { text: 'Update documentation', id: 't2', priority: 2 },
      { text: 'Add new feature', id: 't3', priority: 3 },
      { text: 'Code review', id: 't4', priority: 4 }
    ];
  }

  onTasksReordered(): void {
    console.log('Tasks reordered');
  }

  savePriorities(): void {
    const newOrder = this.tasks.map((task, index) => ({
      ...task,
      priority: index + 1
    }));
    
    console.log('Saved order:', newOrder);
    // Call API to save
  }
}
```

---

## Dual ListBox Drag-and-Drop

Transfer items between two ListBoxes by drag-and-drop. This pattern is useful for moving items between "available" and "selected" lists.

### Enable Dual ListBox Transfer

Use the `scope` property to link two ListBoxes:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-dual-listbox',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <div style="display: flex; gap: 30px; padding: 20px;">
      
      <!-- Available Items List -->
      <div>
        <h3>Available Items</h3>
        <ejs-listbox 
          [dataSource]="availableItems"
          scope="transfer-list"
          [allowDragAndDrop]="true"
          [selectionSettings]="{ mode: 'Multiple' }"
          height="300px">
        </ejs-listbox>
      </div>
      
      <!-- Selected Items List -->
      <div>
        <h3>Selected Items</h3>
        <ejs-listbox 
          [dataSource]="selectedItems"
          scope="transfer-list"
          [allowDragAndDrop]="true"
          [selectionSettings]="{ mode: 'Multiple' }"
          height="300px">
        </ejs-listbox>
      </div>
      
    </div>
  `
})
export class DualListBoxComponent implements OnInit {
  public availableItems: any[] = [];
  public selectedItems: any[] = [];

  ngOnInit(): void {
    this.availableItems = [
      { text: 'Item A', id: 'a' },
      { text: 'Item B', id: 'b' },
      { text: 'Item C', id: 'c' },
      { text: 'Item D', id: 'd' },
      { text: 'Item E', id: 'e' }
    ];
    
    this.selectedItems = [];
  }
}
```

### Key Concept: The `scope` Property

The `scope` property groups ListBoxes together. Only ListBoxes with the **same scope value** can exchange items via drag-and-drop.

```typescript
// These two ListBoxes CAN exchange items (same scope)
<ejs-listbox scope="transfer-list"></ejs-listbox>
<ejs-listbox scope="transfer-list"></ejs-listbox>

// This ListBox CANNOT exchange with above (different scope)
<ejs-listbox scope="other-list"></ejs-listbox>
```

### Complete Dual ListBox Example: Skills Selection

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-skills-selector',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <div style="padding: 20px; max-width: 800px;">
      <h2>Select Your Skills</h2>
      <p>Drag skills from left to right to select them</p>
      
      <div style="display: flex; gap: 40px; margin-top: 20px;">
        
        <!-- Available Skills -->
        <div style="flex: 1;">
          <h3>Available Skills</h3>
          <p style="font-size: 12px; color: #666;">{{ availableSkills.length }} available</p>
          <ejs-listbox 
            #available
            [dataSource]="availableSkills"
            scope="skills-transfer"
            [allowDragAndDrop]="true"
            [selectionSettings]="{ mode: 'Multiple' }"
            height="350px">
          </ejs-listbox>
        </div>
        
        <!-- Selected Skills -->
        <div style="flex: 1;">
          <h3>Selected Skills</h3>
          <p style="font-size: 12px; color: #666;">{{ selectedSkills.length }} selected</p>
          <ejs-listbox 
            #selected
            [dataSource]="selectedSkills"
            scope="skills-transfer"
            [allowDragAndDrop]="true"
            [selectionSettings]="{ mode: 'Multiple' }"
            height="350px">
          </ejs-listbox>
        </div>
        
      </div>
      
      <div style="margin-top: 20px;">
        <button (click)="submitSelection()" 
                style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Submit Selection
        </button>
      </div>
    </div>
  `
})
export class SkillsSelectorComponent implements OnInit {
  @ViewChild('available') availableList: any;
  @ViewChild('selected') selectedList: any;
  
  public availableSkills: any[] = [];
  public selectedSkills: any[] = [];

  ngOnInit(): void {
    this.availableSkills = [
      { text: 'Angular', id: 'ang' },
      { text: 'React', id: 'react' },
      { text: 'Vue', id: 'vue' },
      { text: 'TypeScript', id: 'ts' },
      { text: 'JavaScript', id: 'js' },
      { text: 'Python', id: 'py' },
      { text: 'Java', id: 'java' },
      { text: 'C#', id: 'cs' }
    ];
  }

  submitSelection(): void {
    const selectedIds = this.selectedSkills.map(skill => skill.id);
    console.log('Submitted skills:', selectedIds);
    
    // Send to API
    // this.apiService.saveSkills(selectedIds).subscribe(...);
  }
}
```

---

## Drag-and-Drop Events

### Available Events

| Event | Fires When | Use For |
|-------|-----------|---------|
| **`dragStart`** | Item drag begins | Validate draggable items, change appearance |
| **`drag`** | Item being dragged | Real-time feedback |
| **`drop`** | Item dropped on target | Process the drop, sync data |

### Using Drag-and-Drop Events

```typescript
import { DragEventArgs } from '@syncfusion/ej2-dropdowns';

export class DndEventsComponent implements OnInit {
  public items: any[] = [];

  ngOnInit(): void {
    this.items = [
      { text: 'Item 1', id: '1' },
      { text: 'Item 2', id: '2' },
      { text: 'Item 3', id: '3' }
    ];
  }

  onDragStart(args: DragEventArgs): void {
    console.log('Started dragging items:', args.items);
    console.log('Previous index:', args.previousIndex);
    // Can prevent drag by setting args.cancel = true
  }

  onDrag(args: DragEventArgs): void {
    console.log('Dragging at index:', args.currentIndex);
    console.log('Dragged elements:', args.elements);
  }

  onDrop(args: DragEventArgs): void {
    console.log('Dropped at index:', args.currentIndex);
    console.log('Source data:', args.source);
    console.log('Destination data:', args.destination);
    // Sync with backend if needed
  }
}
```

Template:
```html
<ejs-listbox 
  [dataSource]="items"
  [allowDragAndDrop]="true"
  (dragStart)="onDragStart($event)"
  (drag)="onDrag($event)"
  (drop)="onDrop($event)">
</ejs-listbox>
```

### Example: Prevent Dragging Certain Items

```typescript
import { DragEventArgs } from '@syncfusion/ej2-dropdowns';

onDragStart(args: DragEventArgs): void {
  // Prevent dragging if item is marked as 'locked'
  const draggedItem = args.items[0] as any;
  if (draggedItem && draggedItem.locked) {
    args.cancel = true;
    console.log('Cannot drag locked item');
  }
}
```

---

## Multiple ListBox Scopes

Create multiple independent transfer patterns on the same page:

```typescript
@Component({
  selector: 'app-multiple-transfers',
  template: `
    <div style="display: flex; gap: 40px;">
      
      <!-- Transfer 1: Languages -->
      <div>
        <h3>Select Languages</h3>
        <ejs-listbox 
          [dataSource]="availableLanguages"
          scope="language-transfer"
          [allowDragAndDrop]="true"
          height="200px">
        </ejs-listbox>
        <ejs-listbox 
          [dataSource]="selectedLanguages"
          scope="language-transfer"
          [allowDragAndDrop]="true"
          height="200px">
        </ejs-listbox>
      </div>
      
      <!-- Transfer 2: Frameworks (Different Scope) -->
      <div>
        <h3>Select Frameworks</h3>
        <ejs-listbox 
          [dataSource]="availableFrameworks"
          scope="framework-transfer"
          [allowDragAndDrop]="true"
          height="200px">
        </ejs-listbox>
        <ejs-listbox 
          [dataSource]="selectedFrameworks"
          scope="framework-transfer"
          [allowDragAndDrop]="true"
          height="200px">
        </ejs-listbox>
      </div>
      
    </div>
  `
})
export class MultipleTransfersComponent {
  availableLanguages: any[] = [];
  selectedLanguages: any[] = [];
  availableFrameworks: any[] = [];
  selectedFrameworks: any[] = [];
  
  ngOnInit(): void {
    // Language items can only transfer within language scope
    this.availableLanguages = [
      { text: 'JavaScript', id: 'js' },
      { text: 'Python', id: 'py' }
    ];
    
    // Framework items can only transfer within framework scope
    this.availableFrameworks = [
      { text: 'Angular', id: 'ang' },
      { text: 'React', id: 'react' }
    ];
  }
}
```

---

## Practical Use Cases

### Use Case 1: Task Prioritization
Drag tasks within a single ListBox to set priorities:
```typescript
// Single ListBox with allowDragAndDrop="true"
// Order determines priority
```

### Use Case 2: Permission Assignment
Drag permissions from "Available" to "Granted":
```typescript
// Dual ListBox with scope="permissions"
// Transfer user permissions
```

### Use Case 3: Playlist Builder
Drag songs between "Library" and "Playlist":
```typescript
// Dual ListBox with scope="playlist"
// Users build custom playlists
```

### Use Case 4: Workflow Steps
Drag items to organize workflow steps:
```typescript
// Single ListBox for ordered sequence
// Order determines execution
```

---

## Troubleshooting

### Items Not Draggable

**Problem**: Can't drag items

**Solution**: Ensure `allowDragAndDrop` is `true`
```typescript
[allowDragAndDrop]="true"  // ✓ Correct
allowDragAndDrop="false"   // ✗ Disables drag
```

### Items Not Transferring Between Lists

**Problem**: Drag works but items don't transfer

**Solution**: Verify both ListBoxes have the **same scope**
```typescript
// ✓ Both have scope="transfer"
<ejs-listbox scope="transfer"></ejs-listbox>
<ejs-listbox scope="transfer"></ejs-listbox>

// ✗ Different scopes prevent transfer
<ejs-listbox scope="transfer"></ejs-listbox>
<ejs-listbox scope="other"></ejs-listbox>
```

### Drop Event Not Firing

**Problem**: Drop event handler doesn't execute

**Solution**: Check event binding syntax:
```html
(drop)="onDrop($event)"     <!-- ✓ Correct -->
on-drop="onDrop($event)"    <!-- ✗ Wrong syntax -->
```

---

## Performance Considerations

For large lists with many items:

1. **Limit Selection Count**
   ```typescript
   // Use maximumSelectionLength to cap selections
   [maximumSelectionLength]="10"
   ```

2. **Restrict Height to Enable Scrolling**
   ```typescript
   // Setting a fixed height enables a scrollbar
   height="300px"
   ```

3. **Minimize Change Detection**
   ```typescript
   [changeDetection]="ChangeDetectionStrategy.OnPush"
   ```

---

## Next Steps

- Review [selection-modes.md](selection-modes.md) for multi-select patterns
- Explore [practical-examples.md](practical-examples.md) for complete implementations
- See [customization.md](customization.md) to style drag-and-drop visuals
