---
name: Paging
description: 'Paging in Syncfusion Angular TreeGrid - pagination configuration, page size control, server-side paging, page navigation, and paging events.'
---

# Paging

Paging divides data into pages for better performance and user experience.

## When to Use

Use paging when you need to:
- **Improve performance** — Load data in chunks for large datasets instead of all at once
- **Control page size** — Let users view a specific number of records per page
- **Navigate large datasets** — Provide page controls for browsing through data
- **Server-side paging** — Offload pagination to your backend API
- **Lazy load data** — Fetch only the records needed for the current page
- **Customize page navigation** — Add custom paging templates or controls
- **Reduce UI load** — Display fewer records at a time for better responsiveness

## Table of Contents
- [Enable Paging](#enable-paging)
- [Page Configuration](#page-configuration)
- [Server-Side Paging](#server-side-paging)
- [Paging Events](#paging-events)

## Enable Paging

### Basic Paging

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { PageService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [allowPaging]='true'
      [pageSettings]='pageSettings'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [PageService]
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';

  public pageSettings = {
    pageSize: 10,
    pageCount: 5
  };
}
```

## Page Configuration

### Page Size

```typescript
public pageSettings = {
  pageSize: 10      // Records per page
};
```

### Page Count

```typescript
public pageSettings = {
  pageCount: 5      // Number of pages shown in pager
};
```

### Current Page

```typescript
public pageSettings = {
  currentPage: 1    // Start page (1-indexed)
};
```

### Page Indices

```typescript
public pageSettings = {
  pageSize: 20,
  pageSizes: [10, 20, 50, 100]
};
```

## Server-Side Paging

### Load Data from Server

```typescript
<ejs-treegrid 
  [dataSource]='dataManager'
  [childMapping]='childMapping'
  [allowPaging]='true'
  [pageSettings]='pageSettings'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

export class AppComponent {
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    pageSize: 10
  });

  public pageSettings = {
    pageSize: 10
  };
}
```

### Dynamic Page Size

```typescript
<label>
  Page Size: 
  <select (change)='changePageSize($event)'>
    <option value='10'>10</option>
    <option value='20'>20</option>
    <option value='50'>50</option>
    <option value='100'>100</option>
  </select>
</label>

<ejs-treegrid 
  #treegrid
  [dataSource]='data'
  [childMapping]='childMapping'
  [allowPaging]='true'
  [pageSettings]='pageSettings'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
@ViewChild('treegrid') treegrid!: TreeGridComponent;

changePageSize(event: any) {
  this.pageSettings.pageSize = parseInt(event.target.value);
  this.treegrid.refresh();
}
```

## Paging Events

### Page Change

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  [allowPaging]='true'
  (actionBegin)='onActionBegin($event)'
  (actionComplete)='onActionComplete($event)'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
onActionBegin(args: any) {
  if (args.requestType === 'paging') {
    console.log('Moving to page:', args.currentPage);
  }
}

onActionComplete(args: any) {
  if (args.requestType === 'paging') {
    console.log('Page load complete');
  }
}
```

### Go to Page

```typescript
<input 
  type='number' 
  placeholder='Go to page...' 
  #pageInput>
<button (click)='goToPage()'>Go</button>

<ejs-treegrid 
  #treegrid
  [dataSource]='data'
  [childMapping]='childMapping'
  [allowPaging]='true'
  [pageSettings]='pageSettings'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
@ViewChild('treegrid') treegrid!: TreeGridComponent;
@ViewChild('pageInput') pageInput!: ElementRef;

goToPage() {
  const pageNumber = parseInt(this.pageInput.nativeElement.value);
  this.treegrid.goToPage(pageNumber);
}
```

### Get Current Page Info

```typescript
<button (click)='getPageInfo()'>Get Page Info</button>

<div>{{pageInfo}}</div>
```

```typescript
pageInfo = '';

getPageInfo() {
  const pageSettings = this.treegrid.pageSettings;
  this.pageInfo = `Page ${pageSettings.currentPage} of ${Math.ceil(this.data.length / pageSettings.pageSize)}`;
}
```

### Custom Pager Template

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  [allowPaging]='true'
  [pageSettings]='pageSettings'
  [pagerTemplate]='pagerTemplate'>
  <!-- columns -->
</ejs-treegrid>

<ng-template #pagerTemplate>
  <div style="display: flex; gap: 10px;">
    <button (click)='previousPage()'>← Previous</button>
    <span>Page {{currentPage}} of {{totalPages}}</span>
    <button (click)='nextPage()'>Next →</button>
  </div>
</ng-template>
```

```typescript
currentPage = 1;
totalPages = 1;

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.treegrid.goToPage(this.currentPage);
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.treegrid.goToPage(this.currentPage);
  }
}
```

### Disable Pager

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  [allowPaging]='false'>
  <!-- Show all records without paging -->
</ejs-treegrid>
```
