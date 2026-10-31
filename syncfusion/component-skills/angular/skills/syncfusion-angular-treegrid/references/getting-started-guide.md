---
name: Getting Started Guide
description: 'Getting Started with Syncfusion Angular TreeGrid - installation, setup, module configuration, first component, and basic examples.'
---

# Getting Started Guide

Quick start guide to set up Syncfusion Angular TreeGrid in your Angular project.

## When to Use

Use this guide when you need to:
- **New project setup** — Install TreeGrid from scratch
- **Learn basics** — Understand core TreeGrid concepts
- **First component** — Create your first TreeGrid
- **Module configuration** — Set up required imports and providers
- **Data binding** — Connect data sources
- **Feature enabled** — Enable paging, sorting, filtering
- **Quick examples** — See working code examples

## Table of Contents
- [Installation](#installation)
- [Module Setup](#module-setup)
- [Basic TreeGrid Component](#basic-treegrid-component)
- [Data Binding Basics](#data-binding-basics)

## Installation

### Step 1: Install Syncfusion Packages

```bash
npm install @syncfusion/ej2-angular-treegrid --save
npm install @syncfusion/ej2-base --save
npm install @syncfusion/ej2-Angular-grids --save
```

### Step 2: Include CSS

Add CSS files to your `styles.css` or `angular.json`:

```css
/* styles.css */
@import "@syncfusion/ej2-base/styles/material.css";
@import "@syncfusion/ej2-buttons/styles/material.css";
@import "@syncfusion/ej2-calendars/styles/material.css";
@import "@syncfusion/ej2-dropdowns/styles/material.css";
@import "@syncfusion/ej2-inputs/styles/material.css";
@import "@syncfusion/ej2-popups/styles/material.css";
@import "@syncfusion/ej2-grids/styles/material.css";
@import "@syncfusion/ej2-angular-treegrid/styles/material.css";
```

Or update `angular.json`:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "@syncfusion/ej2-base/styles/material.css",
              "@syncfusion/ej2-buttons/styles/material.css",
              "@syncfusion/ej2-grids/styles/material.css",
              "@syncfusion/ej2-angular-treegrid/styles/material.css"
            ]
          }
        }
      }
    }
  }
}
```

### Step 3: Register License Key (Optional but Recommended)

For licensed versions, register your license key in `main.ts`:

```typescript
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('YOUR_SYNCFUSION_LICENSE_KEY');

bootstrapApplication(AppComponent);
```

## Module Setup

### Import TreeGrid Module

```typescript
import { Component } from '@angular/core';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TreeGridModule],
  template: `
    <ejs-treegrid [dataSource]='data'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='150'></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  public data: Object[] = [];
}
```

### Import in NgModule (Traditional)

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TreeGridModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Basic TreeGrid Component

### Enable Common Features

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [allowPaging]='true'
      [allowSorting]='true'
      [allowFiltering]='true'
      [pageSettings]='pageSettings'
      [editSettings]='editSettings'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90' isPrimaryKey='true'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='150'></e-column>
        <e-column field='Duration' headerText='Duration' width='100'></e-column>
        <e-column field='Progress' headerText='Progress' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  public childMapping: string = 'subtasks';
  
  public pageSettings = {
    pageSize: 20
  };

  public editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Inline'
  };

  public data: Object[] = [
    // ... data
  ];
}
```

### Inject Required Services

For advanced features, inject required services:

```typescript
import { Component } from '@angular/core';
import { 
  PageService, 
  SortService, 
  FilterService, 
  EditService,
  ExcelExportService,
  PdfExportService,
  PrintService
} from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `...`,
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService,
    ExcelExportService,
    PdfExportService,
    PrintService
  ]
})
export class AppComponent {
  // ...
}
```

## Data Binding Basics

### Local Data Array

```typescript
public data: Object[] = [
  { TaskID: 1, TaskName: 'Task 1', Duration: 8 },
  { TaskID: 2, TaskName: 'Task 2', Duration: 10 }
];
```

### Hierarchical Data with Child Mapping

```typescript
public data: Object[] = [
  {
    TaskID: 1,
    TaskName: 'Parent Task',
    Duration: 8,
    subtasks: [
      { TaskID: 2, TaskName: 'Child Task 1', Duration: 4 },
      { TaskID: 3, TaskName: 'Child Task 2', Duration: 4 }
    ]
  }
];

public childMapping: string = 'subtasks';
```

### Remote Data with DataManager

```typescript
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  template: `
    <ejs-treegrid 
      [dataSource]='dataManager'
      [childMapping]='childMapping'>
    </ejs-treegrid>
  `
})
export class AppComponent {
  public childMapping: string = 'subtasks';

  public dataManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor()
  });
}
```

### Dynamic Data Loading

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-treegrid',
  template: `
    <div *ngIf='loading'>Loading...</div>
    <ejs-treegrid *ngIf='!loading' [dataSource]='data'>
      <!-- columns -->
    </ejs-treegrid>
  `
})
export class AppComponent implements OnInit {
  public data: Object[] = [];
  public loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.http.get('url').subscribe({
      next: (response: any) => {
        this.data = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load data:', error);
        this.loading = false;
      }
    });
  }
}
```

## Quick Reference

| Feature | Enable |
|---------|--------|
| Paging | `[allowPaging]='true'` |
| Sorting | `[allowSorting]='true'` |
| Filtering | `[allowFiltering]='true'` |
| Editing | `[editSettings]='editSettings'` |
| Selection | Built-in by default |
| Virtualization | `[enableVirtualization]='true'` |
| Export | Inject ExcelExportService, PdfExportService |

