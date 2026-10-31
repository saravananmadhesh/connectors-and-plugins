# Selection and Item Management in Syncfusion Angular ListView

## Table of Contents
- [Selection Modes](#selection-modes)
- [Getting Selected Items](#getting-selected-items)
- [Adding Items Dynamically](#adding-items-dynamically)
- [Removing Items](#removing-items)
- [Event Handling](#event-handling)
- [Programmatic Selection](#programmatic-selection)

---

## Selection Modes

### No Selection (Default)

```typescript
<ejs-listview [dataSource]='data'></ejs-listview>
```

### Single Item Selection

```typescript
<ejs-listview 
  [dataSource]='data'
  (select)="onItemSelect($event)">
</ejs-listview>
```

### Multiple Selection with Checkboxes

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='checkbox-list'
      [dataSource]='items' 
      [showCheckBox]='true'
      [fields]='fields'>
    </ejs-listview>
  `
})
export class AppComponent {
  public items = [
    { text: 'Hennessey Venom', id: '1' },
    { text: 'Bugatti Chiron', id: '2', isChecked: true },
    { text: 'Bugatti Veyron', id: '3' },
    { text: 'SSC Ultimate Aero', id: '4', isChecked: true },
    { text: 'Koenigsegg CCR', id: '5' }
  ];

  public fields = {
    id: 'id',
    isChecked: 'isChecked'
  };
}
```

### Multiple Selection with Ctrl+Click

```typescript
<ejs-listview 
  [dataSource]='data'
  (select)="onMultiSelect($event)">
</ejs-listview>
```

Users hold Ctrl (Cmd on Mac) and click to select multiple items.

---

## Getting Selected Items

### Using getSelectedItems() Method

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      #listview
      [dataSource]='data' 
      [showCheckBox]='true'
      [fields]='fields'>
    </ejs-listview>
    <br/>
    <button (click)="getSelected()">Get Selected Items</button>
    <div id="output"></div>
  `
})
export class AppComponent {
  @ViewChild('listview') 
  listViewInstance!: ListViewComponent;

  public data = [
    { text: 'Hennessey Venom', id: '1' },
    { text: 'Bugatti Chiron', id: '2', isChecked: true },
    { text: 'Bugatti Veyron', id: '3' },
    { text: 'SSC Ultimate Aero', id: '4', isChecked: true },
    { text: 'Aston Martin', id: '5' }
  ];

  public fields = { id: 'id', isChecked: 'isChecked' };

  getSelected() {
    const selectedItems = this.listViewInstance.getSelectedItems();
    console.log('Selected text:', selectedItems.text);
    console.log('Selected data:', selectedItems.data);
    console.log('Selected elements:', selectedItems.item);
    
    // Display results
    const output = document.getElementById('output');
    if (output) {
      output.innerHTML = `
        <p>Selected: ${selectedItems.text.join(', ')}</p>
      `;
    }
  }
}
```

**Return Values:**
- `text`: Array of selected item text values
- `data`: Array of complete data objects for selected items
- `item`: HTML elements of selected items

### Getting Active (Selected) Item

```typescript
getActiveItem() {
  // Get the currently focused/selected item
  const activeItem = this.listViewInstance.getSelectedItems();
  if (activeItem.data && activeItem.data.length > 0) {
    console.log('Active item:', activeItem.data[0]);
  }
}
```

---

## Adding Items Dynamically

### Adding Single Item

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button (click)="addItem()">Add New Item</button>
    <ejs-listview 
      #listview
      [dataSource]='items' 
      [fields]='fields'>
    </ejs-listview>
  `
})
export class AppComponent {
  @ViewChild('listview') 
  listViewInstance!: ListViewComponent;

  public items: any[] = [
    { text: 'Item 1', id: '1' },
    { text: 'Item 2', id: '2' }
  ];

  public fields = { text: 'text', id: 'id' };
  private itemCounter = 3;

  addItem() {
    const newItem = {
      text: `New Item ${this.itemCounter}`,
      id: this.itemCounter.toString()
    };
    this.listViewInstance.addItem([newItem]);
    this.itemCounter++;
  }
}
```

### Adding Multiple Items

```typescript
addMultipleItems() {
  const newItems = [
    { text: 'Item A', id: 'a' },
    { text: 'Item B', id: 'b' },
    { text: 'Item C', id: 'c' }
  ];
  this.listViewInstance.addItem(newItems);
}
```

### Adding Item at Specific Position

```typescript
addItemAtIndex(data: any, index: number) {
  // Get all items
  const allItems = [...this.items];
  // Insert at position
  allItems.splice(index, 0, data);
  // Update data source
  this.items = allItems;
  this.listViewInstance.refresh();
}
```

### Adding Item with Template

```typescript
addTemplatedItem() {
  const newItem = {
    text: 'Contact',
    email: 'contact@example.com',
    id: Date.now().toString(),
    avatar: 'C'
  };
  this.listViewInstance.addItem([newItem]);
}
```

---

## Removing Items

### Remove Selected Item

```typescript
removeSelectedItem() {
  const selected = this.listViewInstance.getSelectedItems();
  if (selected.item && selected.item.length > 0) {
    this.listViewInstance.removeItem(selected.item[0]);
  }
}
```

### Remove Item by Index

```typescript
removeItemByIndex(index: number) {
  const items = document.querySelectorAll('#listview .e-list-item');
  if (items[index]) {
    this.listViewInstance.removeItem(items[index] as HTMLElement);
  }
}
```

### Remove Item by ID

```typescript
removeItemById(itemId: string) {
  const items = document.querySelectorAll('#listview .e-list-item');
  items.forEach((item: any) => {
    if (item.id === itemId) {
      this.listViewInstance.removeItem(item);
    }
  });
}
```

### Remove Multiple Items

```typescript
removeMultipleItems() {
  const selected = this.listViewInstance.getSelectedItems();
  if (selected.item && selected.item.length > 0) {
    selected.item.forEach(item => {
      this.listViewInstance.removeItem(item as HTMLElement);
    });
  }
}
```

### Clear All Items

```typescript
clearAllItems() {
  this.items = [];
  this.listViewInstance.refresh();
}
```

---

## Event Handling

### Select Event

```typescript
<ejs-listview 
  [dataSource]='data'
  (select)="onItemSelect($event)">
</ejs-listview>
```

```typescript
onItemSelect(event: any) {
  console.log('Selected item:', event.data);
  console.log('Item element:', event.item);
  console.log('Event type:', event.type);
}
```

### ActionComplete Event (After Add/Remove)

```typescript
<ejs-listview 
  [dataSource]='data'
  (actionComplete)="onActionComplete($event)">
</ejs-listview>
```

```typescript
onActionComplete(event: any) {
  console.log('Action completed:', event.eventName);
  console.log('Action type:', event.type);
  // Update UI or perform post-operation tasks
}
```

### Delete Event

```typescript
<ejs-listview 
  [dataSource]='data'
  (delete)="onItemDelete($event)">
</ejs-listview>
```

```typescript
onItemDelete(event: any) {
  console.log('Item deleted:', event.data);
  // Handle deletion side effects
}
```

### Complete Example with Events

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <button (click)="addItem()">Add Item</button>
      <button (click)="removeSelected()">Remove Selected</button>
    </div>
    <ejs-listview 
      #listview
      [dataSource]='items'
      (select)="onSelect($event)"
      (actionComplete)="onActionComplete($event)">
    </ejs-listview>
    <div>{{message}}</div>
  `
})
export class AppComponent {
  @ViewChild('listview') 
  listViewInstance!: ListViewComponent;

  public items: any[] = [
    { text: 'Item 1', id: '1' },
    { text: 'Item 2', id: '2' }
  ];

  public message: string = '';

  onSelect(event: any) {
    this.message = `Selected: ${event.data.text}`;
  }

  onActionComplete(event: any) {
    this.message = `Action: ${event.eventName} completed`;
  }

  addItem() {
    const newItem = {
      text: `New Item ${Date.now()}`,
      id: Date.now().toString()
    };
    this.listViewInstance.addItem([newItem]);
  }

  removeSelected() {
    const selected = this.listViewInstance.getSelectedItems();
    if (selected.item && selected.item.length > 0) {
      this.listViewInstance.removeItem(selected.item[0]);
    }
  }
}
```

---

## Programmatic Selection

### Select Item by Index

```typescript
selectItemByIndex(index: number) {
  const items = document.querySelectorAll('#listview .e-list-item');
  if (items[index]) {
    (items[index] as HTMLElement).click();
  }
}
```

### Select Item by ID

```typescript
selectItemById(itemId: string) {
  const items = document.querySelectorAll('#listview .e-list-item');
  items.forEach((item: any) => {
    if (item.getAttribute('data-id') === itemId) {
      item.click();
    }
  });
}
```

### Select All Items (with Checkbox)

```typescript
selectAll() {
  const checkboxes = document.querySelectorAll('.e-list-checkbox');
  checkboxes.forEach((checkbox: any) => {
    if (!checkbox.checked) {
      checkbox.click();
    }
  });
}
```

### Deselect All Items

```typescript
deselectAll() {
  const checkboxes = document.querySelectorAll('.e-list-checkbox');
  checkboxes.forEach((checkbox: any) => {
    if (checkbox.checked) {
      checkbox.click();
    }
  });
}
```

---

## Best Practices

✅ Always check if items exist before accessing  
✅ Use unique IDs for all items  
✅ Handle empty selection scenarios  
✅ Provide feedback after add/remove operations  
✅ Use checkboxes for multiple selection scenarios  
✅ Validate data before adding items  
✅ Update parent data source after modifications  
✅ Refresh ListView after bulk operations  

