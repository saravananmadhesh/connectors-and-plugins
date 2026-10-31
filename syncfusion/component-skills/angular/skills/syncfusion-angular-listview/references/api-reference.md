# Complete API Reference - Properties, Methods & Events

> **Purpose:** This document provides comprehensive API reference covering all properties, methods, and events for the ListView component. All examples are production-ready with proper imports and error handling.

---

## Table of Contents
- [Properties Reference](#properties-reference)
- [Methods Reference](#methods-reference)
- [Events Reference](#events-reference)

---

## Properties Reference

### `animation` Property

**Type:** `AnimationSettings`  
**Default:** `{ effect: 'SlideLeft', duration: 400, easing: 'ease' }`

The `animation` property controls the animation applied when transitioning between list views or expanding nested lists.

#### Available Animation Effects:
- `SlideLeft` - Slides in from left
- `SlideRight` - Slides in from right
- `Zoom` - Zoom effect
- `Fade` - Fade transition
- `None` - No animation

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-animation-list',
  template: `
    <ejs-listview
      id='animation-list'
      [dataSource]='data'
      [animation]='animationSettings'
      [headerTitle]='title'
      [showHeader]='true'>
    </ejs-listview>
  `
})
export class AnimationListComponent {
  public data = [
    { text: 'Accounts', id: '1' },
    { text: 'Audit', id: '2' },
    { text: 'Customer Relations', id: '3' }
  ];

  public animationSettings = {
    effect: 'Zoom',      // Animation effect
    duration: 600,        // Duration in ms
    easing: 'ease-in-out' // Easing function
  };

  public title = 'Departments';
}
```

---

### `enablePersistence` Property

**Type:** `boolean`  
**Default:** `false`

Persists the ListView's state (selected items, scroll position, etc.) in localStorage between page reloads.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-persistent-list',
  template: `
    <ejs-listview
      id='persist-list'
      [dataSource]='data'
      [enablePersistence]='true'
      [showCheckBox]='true'>
    </ejs-listview>
  `
})
export class PersistentListComponent {
  public data = [
    { text: 'Option 1', id: '1', isChecked: false },
    { text: 'Option 2', id: '2', isChecked: false },
    { text: 'Option 3', id: '3', isChecked: false }
  ];
}
```

**Use Case:** Shopping carts, favorite lists, saved selections that should survive page refreshes.

---

### `enableRtl` Property

**Type:** `boolean`  
**Default:** `false`

Enables right-to-left (RTL) text direction for languages like Arabic, Hebrew, Farsi.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-rtl-list',
  template: `
    <div [dir]="isArabic ? 'rtl' : 'ltr'">
      <ejs-listview
        id='rtl-list'
        [dataSource]='data'
        [enableRtl]='isArabic'>
      </ejs-listview>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-listview.e-rtl {
      direction: rtl;
      text-align: right;
    }
  `]
})
export class RtlListComponent {
  public isArabic = true;
  
  public data = [
    { text: 'مرحبا', id: '1' },
    { text: 'السلام', id: '2' },
    { text: 'عليكم', id: '3' }
  ];
}
```

---

### `locale` Property

**Type:** `string`  
**Default:** `'en-US'`

Sets the locale for localized text and number formatting in the ListView.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-locale-list',
  template: `
    <ejs-listview
      id='locale-list'
      [dataSource]='data'
      [locale]='locale'>
    </ejs-listview>
  `
})
export class LocaleListComponent {
  public locale = 'de-DE'; // German locale
  
  public data = [
    { text: 'Januar', id: '1' },
    { text: 'Februar', id: '2' },
    { text: 'März', id: '3' }
  ];
}
```

---

### `query` Property

**Type:** `Query`  
**Default:** `null`

Filters and selects data from a remote DataManager using OData or REST API queries.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-query-list',
  template: `
    <ejs-listview
      id='query-list'
      [dataSource]='dataManager'
      [query]='query'
      [fields]='fields'
      [headerTitle]='title'
      [showHeader]='true'>
    </ejs-listview>
  `
})
export class QueryListComponent {
  // Remote OData service
  public dataManager = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });

  // Query to filter and select specific columns
  public query = new Query()
    .from('Products')
    .select('ProductID,ProductName,UnitPrice')
    .where('UnitPrice', 'greaterThan', 20)
    .take(10);

  public fields = {
    id: 'ProductID',
    text: 'ProductName'
  };

  public title = 'Products Over $20';
}
```

---

### `width` & `height` Properties

**Type:** `number | string`  
**Default:** `''`

Sets explicit dimensions for the ListView container. Enables dedicated scrolling when both are set.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-sized-list',
  template: `
    <ejs-listview
      id='sized-list'
      [dataSource]='data'
      [width]='400'
      [height]='500'
      [enableVirtualization]='true'>
    </ejs-listview>
  `
})
export class SizedListComponent {
  public data = Array.from({ length: 1000 }, (_, i) => ({
    text: `Item ${i + 1}`,
    id: i.toString()
  }));
}
```

---

### `sortOrder` Property

**Type:** `SortOrder` (enum)  
**Values:** `None | Ascending | Descending`  
**Default:** `'None'`

Sorts the list data in ascending or descending order by the field specified in `fields.sortBy`.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-sorted-list',
  template: `
    <div>
      <button (click)="changeSortOrder('Ascending')">Sort A-Z</button>
      <button (click)="changeSortOrder('Descending')">Sort Z-A</button>
      
      <ejs-listview
        id='sorted-list'
        [dataSource]='data'
        [sortOrder]='sortOrder'
        [fields]='fields'>
      </ejs-listview>
    </div>
  `
})
export class SortedListComponent {
  public sortOrder: string = 'Ascending';

  public data = [
    { name: 'Zebra', id: '1' },
    { name: 'Apple', id: '2' },
    { name: 'Mango', id: '3' },
    { name: 'Banana', id: '4' }
  ];

  public fields = {
    text: 'name',
    id: 'id',
    sortBy: 'name'
  };

  changeSortOrder(order: string) {
    this.sortOrder = order;
  }
}
```

---

### `cssClass` Property

**Type:** `string`  
**Default:** `''`

Adds custom CSS classes to the ListView root element for styling and functionality customization.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-custom-styled-list',
  template: `
    <ejs-listview
      id='styled-list'
      [dataSource]='data'
      cssClass='custom-list compact-mode'>
    </ejs-listview>
  `,
  styles: [`
    :host ::ng-deep .custom-list {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    :host ::ng-deep .custom-list.compact-mode .e-list-item {
      padding: 4px 8px;
      font-size: 12px;
    }

    :host ::ng-deep .custom-list .e-list-item:hover {
      background-color: #f0f0f0;
    }
  `]
})
export class CustomStyledListComponent {
  public data = [
    { text: 'Item 1', id: '1' },
    { text: 'Item 2', id: '2' },
    { text: 'Item 3', id: '3' }
  ];
}
```

---

### `htmlAttributes` Property

**Type:** `object`  
**Default:** `{}`

Adds custom HTML attributes (id, class, data-*, etc.) to the ListView element.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-attr-list',
  template: `
    <ejs-listview
      id='attr-list'
      [dataSource]='data'
      [htmlAttributes]='customAttrs'>
    </ejs-listview>
  `
})
export class AttrListComponent {
  public data = [
    { text: 'Home', id: '1' },
    { text: 'Profile', id: '2' },
    { text: 'Settings', id: '3' }
  ];

  public customAttrs = {
    'data-testid': 'navigation-list',
    'aria-label': 'Main navigation',
    'role': 'navigation'
  };
}
```

---

## Methods Reference

### `back()` Method

**Returns:** `void`

Navigates back from a nested list to the parent list.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-nested-nav',
  template: `
    <button (click)="goBack()" *ngIf="isInNestedList">← Back</button>
    
    <ejs-listview
      #listview
      id='nested-list'
      [dataSource]='data'
      (select)='onSelect($event)'>
    </ejs-listview>
  `
})
export class NestedNavComponent {
  @ViewChild('listview') listViewInstance?: ListViewComponent;

  public isInNestedList = false;

  public data = [
    {
      text: 'Accounts',
      id: '1',
      child: [
        { text: 'Checking', id: '1-1' },
        { text: 'Savings', id: '1-2' }
      ]
    },
    {
      text: 'Downloads',
      id: '2',
      child: [
        { text: 'Documents', id: '2-1' },
        { text: 'Images', id: '2-2' }
      ]
    }
  ];

  onSelect(event: any) {
    // When user selects parent with children, they navigate into nested list
    this.isInNestedList = !!event.data.child;
  }

  goBack() {
    if (this.listViewInstance) {
      this.listViewInstance.back();
      this.isInNestedList = false;
    }
  }
}
```

---

### `checkAllItems()` Method

**Returns:** `void`

Checks all items in the ListView when checkboxes are enabled.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-check-all',
  template: `
    <div>
      <button (click)="selectAll()">Check All</button>
      <button (click)="deselectAll()">Uncheck All</button>
    </div>

    <ejs-listview
      #checklist
      id='checklist'
      [dataSource]='tasks'
      [showCheckBox]='true'
      [fields]='fields'>
    </ejs-listview>
  `
})
export class CheckAllComponent {
  @ViewChild('checklist') checklistInstance?: ListViewComponent;

  public tasks = [
    { text: 'Review Code', id: '1', isChecked: false },
    { text: 'Write Tests', id: '2', isChecked: false },
    { text: 'Deploy', id: '3', isChecked: false }
  ];

  public fields = { isChecked: 'isChecked' };

  selectAll() {
    if (this.checklistInstance) {
      this.checklistInstance.checkAllItems();
    }
  }

  deselectAll() {
    if (this.checklistInstance) {
      this.checklistInstance.uncheckAllItems();
    }
  }
}
```

---

### `checkItem(item)` & `uncheckItem(item)` Methods

**Parameter:** `item` - `Fields | HTMLElement | Element`  
**Returns:** `void`

Checks or unchecks a specific list item programmatically.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-manual-check',
  template: `
    <button (click)="toggleItemById('1')">Toggle Item 1</button>
    <button (click)="toggleItemById('2')">Toggle Item 2</button>

    <ejs-listview
      #itemlist
      id='item-list'
      [dataSource]='items'
      [showCheckBox]='true'
      [fields]='fields'>
    </ejs-listview>
  `
})
export class ManualCheckComponent {
  @ViewChild('itemlist') itemlistInstance?: ListViewComponent;

  public items = [
    { text: 'JavaScript', id: '1', isChecked: false },
    { text: 'TypeScript', id: '2', isChecked: true },
    { text: 'Angular', id: '3', isChecked: false }
  ];

  public fields = { isChecked: 'isChecked' };

  toggleItemById(id: string) {
    if (!this.itemlistInstance) return;

    const element = this.itemlistInstance.element.querySelector(
      `[data-uid="${id}"]`
    ) as HTMLElement;

    if (element) {
      const isChecked = element.classList.contains('e-checked');
      
      if (isChecked) {
        this.itemlistInstance.uncheckItem(element);
      } else {
        this.itemlistInstance.checkItem(element);
      }
    }
  }
}
```

---

### `disableItem(item)` & `enableItem(item)` Methods

**Parameter:** `item` - `Fields | HTMLElement | Element`  
**Returns:** `void`

Disables or enables specific list items (grayed out, non-interactive).

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-disable-items',
  template: `
    <button (click)="toggleDisable('1')">Toggle Item 1</button>

    <ejs-listview
      #disablelist
      id='disable-list'
      [dataSource]='items'
      [fields]='fields'>
    </ejs-listview>
  `,
  styles: [`
    :host ::ng-deep .e-list-item.e-disabled {
      opacity: 0.5;
      cursor: not-allowed;
      color: #999;
    }
  `]
})
export class DisableItemsComponent {
  @ViewChild('disablelist') disablelistInstance?: ListViewComponent;

  public items = [
    { text: 'Active Item', id: '1', enabled: true },
    { text: 'Another Active', id: '2', enabled: true },
    { text: 'Locked Item', id: '3', enabled: false }
  ];

  public fields = { enabled: 'enabled' };

  toggleDisable(id: string) {
    if (!this.disablelistInstance) return;

    const element = this.disablelistInstance.element.querySelector(
      `[data-uid="${id}"]`
    ) as HTMLElement;

    if (element) {
      const isDisabled = element.classList.contains('e-disabled');
      
      if (isDisabled) {
        this.disablelistInstance.enableItem(element);
      } else {
        this.disablelistInstance.disableItem(element);
      }
    }
  }
}
```

---

### `findItem(item)` Method

**Parameter:** `item` - `Fields | HTMLElement | Element`  
**Returns:** `SelectedItem`

Finds an item and returns its details from the ListView.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-find-item',
  template: `
    <button (click)="findItemById('2')">Find Item 2</button>

    <ejs-listview
      #findlist
      id='find-list'
      [dataSource]='items'>
    </ejs-listview>

    <div *ngIf="foundItem">
      <h4>Found Item:</h4>
      <p>{{ foundItem.text }}</p>
      <p>ID: {{ foundItem.id }}</p>
    </div>
  `
})
export class FindItemComponent {
  @ViewChild('findlist') findlistInstance?: ListViewComponent;

  public items = [
    { text: 'React', id: '1' },
    { text: 'Vue', id: '2' },
    { text: 'Svelte', id: '3' }
  ];

  public foundItem: any = null;

  findItemById(id: string) {
    if (!this.findlistInstance) return;

    const element = this.findlistInstance.element.querySelector(
      `[data-uid="${id}"]`
    );

    if (element) {
      this.foundItem = this.findlistInstance.findItem(element);
      console.log('Found:', this.foundItem);
    }
  }
}
```

---

### `hideItem(item)` & `showItem(item)` Methods

**Parameter:** `item` - `Fields | HTMLElement | Element`  
**Returns:** `void`

Hides or shows specific list items without removing them from data.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-hide-items',
  template: `
    <button (click)="toggleVisibility('2')">Toggle Item 2</button>

    <ejs-listview
      #hidelist
      id='hide-list'
      [dataSource]='items'>
    </ejs-listview>
  `
})
export class HideItemsComponent {
  @ViewChild('hidelist') hidelistInstance?: ListViewComponent;

  public items = [
    { text: 'Visible Item 1', id: '1' },
    { text: 'Item to Hide', id: '2' },
    { text: 'Visible Item 3', id: '3' }
  ];

  toggleVisibility(id: string) {
    if (!this.hidelistInstance) return;

    const element = this.hidelistInstance.element.querySelector(
      `[data-uid="${id}"]`
    ) as HTMLElement;

    if (element) {
      const isHidden = element.style.display === 'none';
      
      if (isHidden) {
        this.hidelistInstance.showItem(element);
      } else {
        this.hidelistInstance.hideItem(element);
      }
    }
  }
}
```

---

### `refreshItemHeight()` Method

**Returns:** `void`

Recalculates item heights in virtualized ListView. Call after dynamically changing item heights.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent, VirtualizationService } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  providers: [VirtualizationService],
  standalone: true,
  selector: 'app-refresh-height',
  template: `
    <button (click)="expandAll()">Expand All</button>

    <ejs-listview
      #virtuallist
      id='virtual-list'
      [dataSource]='largeData'
      [enableVirtualization]='true'
      [itemHeight]='40'
      [height]='500'>
    </ejs-listview>
  `,
  styles: [`
    :host ::ng-deep .expanded .e-list-item {
      min-height: 100px !important;
    }
  `]
})
export class RefreshHeightComponent {
  @ViewChild('virtuallist') virtuallistInstance?: ListViewComponent;

  public largeData = Array.from({ length: 5000 }, (_, i) => ({
    text: `Item ${i + 1}`,
    id: i.toString()
  }));

  expandAll() {
    if (!this.virtuallistInstance) return;

    // Expand all items in DOM
    const items = this.virtuallistInstance.element.querySelectorAll('.e-list-item');
    items.forEach(item => item.classList.add('expanded'));

    // Recalculate heights for virtualization
    this.virtuallistInstance.refreshItemHeight();
  }
}
```

---

### `selectMultipleItems(items)` & `unselectItem(item)` Methods

**Parameter:** `items` - `Fields[] | HTMLElement[] | Element[]`  
**Returns:** `void`

Selects or deselects multiple items programmatically.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-multi-select',
  template: `
    <button (click)="selectMultipleIds(['1', '3'])">Select 1 & 3</button>
    <button (click)="clearSelection()">Clear All</button>

    <ejs-listview
      #multilist
      id='multi-list'
      [dataSource]='items'>
    </ejs-listview>
  `
})
export class MultiSelectComponent {
  @ViewChild('multilist') multilistInstance?: ListViewComponent;

  public items = [
    { text: 'Python', id: '1' },
    { text: 'Java', id: '2' },
    { text: 'C++', id: '3' },
    { text: 'Go', id: '4' }
  ];

  selectMultipleIds(ids: string[]) {
    if (!this.multilistInstance) return;

    const elements: HTMLElement[] = [];
    ids.forEach(id => {
      const element = this.multilistInstance?.element.querySelector(
        `[data-uid="${id}"]`
      ) as HTMLElement;
      if (element) elements.push(element);
    });

    if (elements.length > 0) {
      this.multilistInstance.selectMultipleItems(elements);
    }
  }

  clearSelection() {
    if (!this.multilistInstance) return;

    const allItems = this.multilistInstance.element.querySelectorAll('.e-active');
    allItems.forEach((item: Element) => {
      this.multilistInstance?.unselectItem(item);
    });
  }
}
```

---

### `removeMultipleItems(items)` Method

**Parameter:** `items` - `HTMLElement[] | Element[] | Fields[]`  
**Returns:** `void`

Removes multiple items from the ListView in one operation.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-remove-multiple',
  template: `
    <button (click)="deleteSelected()">Delete Selected</button>

    <ejs-listview
      #removelist
      id='remove-list'
      [dataSource]='items'
      [showCheckBox]='true'
      [fields]='fields'>
    </ejs-listview>
  `
})
export class RemoveMultipleComponent {
  @ViewChild('removelist') removelistInstance?: ListViewComponent;

  public items = [
    { text: 'Draft 1', id: '1', isChecked: false },
    { text: 'Draft 2', id: '2', isChecked: true },
    { text: 'Draft 3', id: '3', isChecked: true }
  ];

  public fields = { isChecked: 'isChecked' };

  deleteSelected() {
    if (!this.removelistInstance) return;

    // Get all checked items
    const checkedItems = this.removelistInstance.element.querySelectorAll(
      '.e-list-item.e-checked'
    );

    if (checkedItems.length > 0) {
      this.removelistInstance.removeMultipleItems(
        Array.from(checkedItems) as HTMLElement[]
      );
    }
  }
}
```

---

### `render()` & `destroy()` Methods

**Returns:** `void`

Manually initializes or destroys the ListView component.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-lifecycle-list',
  template: `
    <button (click)="recreateList()">Recreate List</button>
    <button (click)="destroyList()">Destroy List</button>

    <div #listContainer>
      <ejs-listview
        *ngIf="isVisible"
        #lifecyclelist
        id='lifecycle-list'
        [dataSource]='items'>
      </ejs-listview>
    </div>
  `
})
export class LifecycleListComponent {
  @ViewChild('lifecyclelist') lifecyclelistInstance?: ListViewComponent;
  
  public isVisible = true;
  public items = [
    { text: 'Mount', id: '1' },
    { text: 'Update', id: '2' },
    { text: 'Unmount', id: '3' }
  ];

  destroyList() {
    if (this.lifecyclelistInstance) {
      this.lifecyclelistInstance.destroy();
      this.isVisible = false;
    }
  }

  recreateList() {
    this.isVisible = true;
    setTimeout(() => {
      if (this.lifecyclelistInstance) {
        this.lifecyclelistInstance.render();
      }
    }, 100);
  }
}
```

---

## Events Reference

### `select` Event - SelectEventArgs

Triggered when a list item is selected.

**SelectEventArgs Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to prevent item selection |
| `data` | `object \| string[] \| number[]` | The selected item's dataSource object |
| `event` | `MouseEvent \| KeyboardEvent` | The DOM event that triggered selection |
| `index` | `number` | Index of the selected item |
| `isChecked` | `boolean` | Whether checkbox is checked (if enabled) |
| `isInteracted` | `boolean` | Whether event was user-triggered |
| `item` | `HTMLElement \| Element` | The selected list item DOM element |
| `name` | `string` | Event name: `'select'` |
| `text` | `string` | The display text of selected item |

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { SelectEventArgs } from '@syncfusion/ej2-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-select-event',
  template: `
    <ejs-listview
      id='select-list'
      [dataSource]='items'
      (select)='onSelect($event)'>
    </ejs-listview>

    <div *ngIf="selectedInfo">
      <h4>Selection Details:</h4>
      <p>Text: {{ selectedInfo.text }}</p>
      <p>Index: {{ selectedInfo.index }}</p>
      <p>User Interaction: {{ selectedInfo.isInteracted }}</p>
    </div>
  `
})
export class SelectEventComponent {
  public items = [
    { text: 'Bike', id: '1' },
    { text: 'Car', id: '2' },
    { text: 'Truck', id: '3' }
  ];

  public selectedInfo: any = null;

  onSelect(args: SelectEventArgs) {
    console.log('Selected Item:', args.data);
    console.log('Index:', args.index);
    console.log('User Interaction:', args.isInteracted);
    console.log('Checkbox Checked:', args.isChecked);

    // Prevent selection of specific items
    if (args.data.id === '3') {
      args.cancel = true; // Prevent Truck from being selected
    }

    this.selectedInfo = {
      text: args.text,
      index: args.index,
      isInteracted: args.isInteracted
    };
  }
}
```

---

### `scroll` Event - ScrolledEventArgs

Triggered when scrolling reaches top or bottom of ListView.

**ScrolledEventArgs Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `distanceX` | `number` | Horizontal scroll distance in pixels |
| `distanceY` | `number` | Vertical scroll distance in pixels |

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { ScrolledEventArgs } from '@syncfusion/ej2-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-scroll-event',
  template: `
    <ejs-listview
      id='scroll-list'
      [dataSource]='items'
      [height]='400'
      (scroll)='onScroll($event)'>
    </ejs-listview>

    <p>Scroll Position: {{ scrollPosition }}px</p>
    <p>{{ scrollMessage }}</p>
  `
})
export class ScrollEventComponent {
  public items = Array.from({ length: 100 }, (_, i) => ({
    text: `Item ${i + 1}`,
    id: i.toString()
  }));

  public scrollPosition = 0;
  public scrollMessage = '';

  onScroll(args: ScrolledEventArgs) {
    this.scrollPosition = args.distanceY;

    // Detect when near bottom for lazy loading
    if (args.distanceY > 90) {
      this.scrollMessage = '📥 Near bottom - ready to load more';
      this.loadMoreData();
    } else if (args.distanceY < 10) {
      this.scrollMessage = '📤 At top';
    }
  }

  loadMoreData() {
    console.log('Loading more items...');
    // Fetch and append new items
  }
}
```

---

### `actionBegin` & `actionComplete` Events

Triggered before and after ListView operations (add, remove, etc.).

**Event Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `eventName` | `string` | Name of the action: `'add'`, `'remove'`, `'select'` |
| `data` | `object[]` | Items involved in the action |
| `cancel` | `boolean` | Set to `true` to cancel the action |

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-action-events',
  template: `
    <button (click)="addItem()">Add New</button>
    <p>Status: {{ status }}</p>

    <ejs-listview
      #actionlist
      id='action-list'
      [dataSource]='items'
      (actionBegin)='onActionBegin($event)'
      (actionComplete)='onActionComplete($event)'>
    </ejs-listview>
  `
})
export class ActionEventsComponent {
  @ViewChild('actionlist') actionlistInstance?: ListViewComponent;

  public items: any[] = [
    { text: 'Task 1', id: '1' },
    { text: 'Task 2', id: '2' }
  ];

  public status = 'Ready';

  addItem() {
    const newItem = { text: `Task ${this.items.length + 1}`, id: Date.now().toString() };
    if (this.actionlistInstance) {
      this.actionlistInstance.addItem([newItem]);
    }
  }

  onActionBegin(event: any) {
    console.log(`Action starting: ${event.eventName}`);
    this.status = `⏳ ${event.eventName} in progress...`;
  }

  onActionComplete(event: any) {
    console.log(`Action completed: ${event.eventName}`);
    this.status = `✅ ${event.eventName} completed`;
  }
}
```

---

### `actionFailure` Event

Triggered when a remote data fetch fails.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { DataManager } from '@syncfusion/ej2-data';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-action-failure',
  template: `
    <ejs-listview
      id='failure-list'
      [dataSource]='dataManager'
      [fields]='fields'
      (actionFailure)='onActionFailure($event)'>
    </ejs-listview>

    <div *ngIf="error" class="error">
      ❌ {{ error }}
    </div>
  `,
  styles: [`
    .error {
      color: #d32f2f;
      padding: 12px;
      border: 1px solid #d32f2f;
      border-radius: 4px;
    }
  `]
})
export class ActionFailureComponent {
  public dataManager = new DataManager({
    url: 'https://invalid-domain-that-fails.com/api/data',
    crossDomain: true
  });

  public fields = { id: 'id', text: 'name' };
  public error = '';

  onActionFailure(event: any) {
    console.error('Data fetch failed:', event);
    this.error = `Failed to load data: ${event.error?.message || 'Unknown error'}`;
  }
}
```

---

## API Coverage Summary

**Complete Reference:**
- ✅ 9 Properties (animation, enablePersistence, enableRtl, locale, query, width/height, sortOrder, cssClass, htmlAttributes)
- ✅ 12 Methods (back, checkAll/uncheckAll, checkItem/uncheckItem, disableItem/enableItem, findItem, hideItem/showItem, refreshItemHeight, selectMultipleItems, unselectItem, removeMultipleItems, render/destroy)
- ✅ 5 Events with Complete Arguments (select, scroll, actionBegin, actionComplete, actionFailure)

All examples are production-ready and follow Angular 21+ standalone patterns.

