---
name: Loading-animation
description: 'Loading animation in Syncfusion Angular TreeGrid - spinner display configuration, custom loader templates, animation events, and loading state management.'
---

# Loading Animation

Loading animation displays a spinner while data is being loaded or processed.

## When to Use

Use loading animation when you need to:
- **Show loading state** — Display spinner while fetching data
- **Visual feedback** — Indicate that operation is in progress
- **Long operations** — Show progress during slow API calls
- **Custom spinners** — Use custom loading animations
- **Shimmer effect** — Show skeleton loading state
- **User expectation** — Let users know something is happening

## Table of Contents
- [Display Spinner](#display-spinner)
- [Display Shimmer](#display-shimmer)

### Display Spinner

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <button (click)='showLoading()'>Load Data</button>
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [childMapping]='childMapping'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: Object[] = [];
  public childMapping: string = 'subtasks';

  showLoading() {
    this.treegrid.showSpinner();
    setTimeout(() => {
      this.treegrid.hideSpinner();
    }, 2000);
  }
}
```

### Display Shimmer

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeGridComponent, PageService } from '@syncfusion/ej2-angular-treegrid';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [treeColumnIndex]='1'
      [hasChildMapping]='hasChildMapping'
      [idMapping]='idMapping'
      [parentIdMapping]='parentIdMapping'
      [loadingIndicator]='loadingIndicator'
      [allowPaging]='true'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='170'></e-column>
        <e-column field='StartDate' headerText='Start Date' width='130'></e-column>
        <e-column field='Duration' headerText='Duration' width='80'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [PageService]
})
export class AppComponent implements OnInit {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: DataManager;
  public hasChildMapping: string = 'isParent';
  public idMapping: string = 'TaskID';
  public parentIdMapping: string = 'ParentItem';
  public loadingIndicator: any;

  ngOnInit() {
    this.data = new DataManager({
      url: 'url',
      adaptor: new UrlAdaptor(),
      crossDomain: true
    });
    
    // Configure shimmer loading indicator
    this.loadingIndicator = { indicatorType: 'Shimmer' };
  }
}
```