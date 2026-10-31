# Advanced Features in Syncfusion Angular ListView

## Table of Contents
- [Virtualization](#virtualization)
- [Scrolling](#scrolling)
- [Drag and Drop](#drag-and-drop)
- [Filtering](#filtering)
- [Paging Integration](#paging-integration)
- [Loading States](#loading-states)
- [AJAX Content Loading](#ajax-content-loading)

---

## Virtualization

### Module Injection: VirtualizationService

To use UI virtualization, you must inject the `VirtualizationService` into your component's providers:

**For Standalone Components (Angular 14+):**
```typescript
import { ListViewModule, VirtualizationService } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  providers: [VirtualizationService],  // ← Required for virtualization
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='virtual-list'
      [dataSource]='largeDataset' 
      [enableVirtualization]='true'
      [height]='400'>
    </ejs-listview>
  `
})
export class AppComponent {
  public largeDataset: any[] = [];

  constructor() {
    this.generateLargeDataset();
  }

  generateLargeDataset() {
    for (let i = 1; i <= 5000; i++) {
      this.largeDataset.push({
        text: `Item ${i}`,
        id: i.toString()
      });
    }
  }
}
```

**For NgModule-based Projects (Angular 13 and below):**
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ListViewModule, VirtualizationService } from '@syncfusion/ej2-angular-lists';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ListViewModule],
  providers: [VirtualizationService],  // ← Inject VirtualizationService
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Enable Virtualization for Large Datasets

Virtualization renders only visible items, dramatically improving performance:

```typescript
<ejs-listview 
  [dataSource]='largeDataset'
  [enableVirtualization]='true'
  [itemHeight]='50'
  [height]='500'
  [fields]='fields'>
</ejs-listview>
```

**Key properties:**
- `enableVirtualization`: boolean - Enable/disable virtualization
- `itemHeight`: number - Height of each item (required for calculation, default: 41px)
- `height`: number/string - ListView container height (enables container scrolling)

### Virtual Scroll vs Window Scroll

**Window Scroll** (Default - entire browser window scrolls):
```typescript
<ejs-listview 
  [dataSource]='data'
  [enableVirtualization]='true'>
  <!-- No height property set -->
</ejs-listview>
```

**Container Scroll** (Dedicated scrollable container):
```typescript
<ejs-listview 
  [dataSource]='data'
  [enableVirtualization]='true'
  [height]='500'>  <!-- ← Creates dedicated scrollable container -->
</ejs-listview>
```

### Performance Optimization with Virtualization

```typescript
import { ListViewModule, VirtualizationService } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  providers: [VirtualizationService],
  standalone: true,
  template: `
    <ejs-listview 
      id='optimized-list'
      [dataSource]='largeDataset'
      [enableVirtualization]='true'
      [itemHeight]='48'
      [height]='600'
      [fields]='fields'>
      <ng-template #template let-data>
        <div class="list-item">
          <span>{{data.text}}</span>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .list-item {
      height: 48px;
      padding: 8px;
      display: flex;
      align-items: center;
    }
  `]
})
export class AppComponent {
  public largeDataset: any[] = [];
  public fields = { text: 'text', id: 'id' };

  ngOnInit() {
    // Generate 10,000 items
    for (let i = 1; i <= 10000; i++) {
      this.largeDataset.push({
        id: i.toString(),
        text: `Product ${i}`,
        price: Math.random() * 1000
      });
    }
  }
}
```

**Best practices:**
- Set `itemHeight` to exact pixel value matching your template
- Set `height` to container's visible height
- Use simple templates for better performance
- Keep item data minimal (no complex objects)
- Batch API calls for loading more data

**Use virtualization when:**
- Dataset has 500+ items
- Need to display 10,000+ items efficiently
- Performance is critical
- Mobile/low-resource devices
- Large DOM would cause memory issues

---

## Scrolling

### Basic Scrolling

```typescript
<ejs-listview 
  [dataSource]='data'
  [height]='400'
  style="overflow-y: auto;">
</ejs-listview>
```

### Scroll to Item Programmatically

```typescript
scrollToItem(itemIndex: number) {
  const items = document.querySelectorAll('.e-list-item');
  if (items[itemIndex]) {
    items[itemIndex].scrollIntoView({ behavior: 'smooth' });
  }
}
```

### Scroll to End

```typescript
scrollToEnd() {
  const listView = document.getElementById('sample-list');
  if (listView) {
    listView.scrollTop = listView.scrollHeight;
  }
}
```

### Scroll Event Handler

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      [dataSource]='data'
      (scroll)="onScroll($event)">
    </ejs-listview>
  `
})
export class AppComponent {
  public data: any[] = [];

  onScroll(event: any) {
    console.log('Scroll position:', event.distanceY);
    
    // Load more data when near bottom
    if (event.distanceY > 90) {
      this.loadMoreData();
    }
  }

  loadMoreData() {
    // Fetch additional data from API
  }
}
```

---

## Drag and Drop

### Enable Drag and Drop Reordering

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='draggable-list'
      [dataSource]='items' 
      [allowDragAndDrop]='true'>
    </ejs-listview>
  `
})
export class AppComponent {
  public items = [
    { text: 'Task 1', id: '1' },
    { text: 'Task 2', id: '2' },
    { text: 'Task 3', id: '3' },
    { text: 'Task 4', id: '4' },
    { text: 'Task 5', id: '5' }
  ];
}
```

### Two-Way Drag and Drop Between Lists

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="display: flex; gap: 20px;">
      <div>
        <h3>Available</h3>
        <ejs-listview 
          #availableList
          [dataSource]='availableItems' 
          [allowDragAndDrop]='true'
          [scope]='scope'>
        </ejs-listview>
      </div>
      <div>
        <h3>Selected</h3>
        <ejs-listview 
          #selectedList
          [dataSource]='selectedItems' 
          [allowDragAndDrop]='true'
          [scope]='scope'>
        </ejs-listview>
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('availableList') availableList!: ListViewComponent;
  @ViewChild('selectedList') selectedList!: ListViewComponent;

  public scope: string = 'shared-scope';
  public availableItems = [
    { text: 'Item 1', id: '1' },
    { text: 'Item 2', id: '2' },
    { text: 'Item 3', id: '3' }
  ];

  public selectedItems: any[] = [];
}
```

---

## Filtering

### Filter List Items

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <input 
      type="text" 
      placeholder="Search items..."
      (input)="onFilter($event)"
      class="search-box">
    <ejs-listview 
      #listview
      [dataSource]='filteredData'>
    </ejs-listview>
  `,
  styles: [`
    .search-box {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  @ViewChild('listview') listViewInstance!: ListViewComponent;

  public allData = [
    { text: 'Apple', id: '1' },
    { text: 'Apricot', id: '2' },
    { text: 'Banana', id: '3' },
    { text: 'Blueberry', id: '4' },
    { text: 'Cherry', id: '5' }
  ];

  public filteredData: any[] = [...this.allData];

  onFilter(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredData = this.allData.filter(item =>
      item.text.toLowerCase().includes(searchValue)
    );
  }
}
```

### Advanced Filtering with Multiple Criteria

```typescript
filterByMultipleCriteria(filters: { [key: string]: any }) {
  this.filteredData = this.allData.filter(item => {
    return Object.keys(filters).every(key =>
      item[key].toString().toLowerCase()
        .includes(filters[key].toLowerCase())
    );
  });
}
```

---

## Paging Integration

### Integrate with Pager Component

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { PagerModule } from '@syncfusion/ej2-angular-grids';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule, PagerModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-pager 
      #pager
      [pageSize]='pageSize'
      [pageCount]='pageCount'
      (click)="onPageChange($event)">
    </ejs-pager>
    
    <ejs-listview 
      [dataSource]='currentPageData'>
    </ejs-listview>
  `
})
export class AppComponent {
  public allData: any[] = [];
  public pageSize: number = 10;
  public currentPage: number = 1;
  public pageCount: number = 0;
  public currentPageData: any[] = [];

  constructor() {
    this.loadData();
  }

  loadData() {
    // Load all data
    for (let i = 1; i <= 100; i++) {
      this.allData.push({ text: `Item ${i}`, id: i.toString() });
    }
    this.pageCount = Math.ceil(this.allData.length / this.pageSize);
    this.updatePageData();
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updatePageData();
  }

  updatePageData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.currentPageData = this.allData.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }
}
```

---

## Loading States

### Display Spinner During Data Load

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ListViewModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div *ngIf="isLoading" class="spinner-container">
      <div class="spinner"></div>
      <p>Loading items...</p>
    </div>
    
    <ejs-listview 
      *ngIf="!isLoading"
      [dataSource]='data'>
    </ejs-listview>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 300px;
    }
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class AppComponent {
  public data: any[] = [];
  public isLoading: boolean = true;

  constructor() {
    this.loadData();
  }

  loadData() {
    // Simulate API call
    setTimeout(() => {
      this.data = [
        { text: 'Item 1', id: '1' },
        { text: 'Item 2', id: '2' },
        { text: 'Item 3', id: '3' }
      ];
      this.isLoading = false;
    }, 2000);
  }
}
```

---

## AJAX Content Loading

### Load HTML Content into List Items

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='ajax-list'
      [dataSource]='data'
      cssClass='e-list-template'>
      
      <ng-template #template let-data="">
        <div class="e-list-wrapper">
          <span class="e-list-content" [innerHTML]="data.htmlContent"></span>
        </div>
      </ng-template>
    </ejs-listview>
  `
})
export class AppComponent {
  public data: any[] = [];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.loadAjaxContent();
  }

  loadAjaxContent() {
    const items = [
      { id: '1', title: 'Content 1', url: '/api/content/1' },
      { id: '2', title: 'Content 2', url: '/api/content/2' },
      { id: '3', title: 'Content 3', url: '/api/content/3' }
    ];

    items.forEach(item => {
      this.http.get(item.url, { responseType: 'text' }).subscribe(
        (content) => {
          this.data.push({
            id: item.id,
            title: item.title,
            htmlContent: this.sanitizer.sanitize(
              1, // SecurityContext.HTML
              content
            )
          });
        }
      );
    });
  }
}
```

---

## Performance Best Practices

✅ Enable virtualization for 500+ items  
✅ Use appropriate `itemHeight` for virtualization  
✅ Lazy load data as user scrolls  
✅ Implement debouncing for filter/search  
✅ Use `OnPush` change detection for large lists  
✅ Avoid complex templates with heavy computations  
✅ Cache computed properties  
✅ Test performance with realistic dataset sizes  
✅ Monitor memory usage with large datasets  
✅ Use web workers for data processing if needed  

