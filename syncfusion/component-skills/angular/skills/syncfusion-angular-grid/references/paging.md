# Paging

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Enable Pagination](#enable-pagination)
- [Page Settings](#page-settings)
- [Pager Modes](#pager-modes)
- [Paging Events](#paging-events)

## When to Use This Skill

Use this skill when you need to:
- **Display large datasets** — Split data into manageable pages
- **Improve performance** — Load and display only current page
- **User navigation** — Provide page navigation controls
- **Configure pager** — Set page size, positioning, and behavior
- **Handle paging events** — Respond to page changes
- **Custom paging** — Implement server-side pagination
- **Pager styling** — Customize pager appearance

## Overview

Paging displays a limited number of rows per page and provides navigation controls. This improves performance and user experience with large datasets.

> **CSS Requirement:** The Pager (page number buttons, navigation arrows, page-size dropdown) relies on `@syncfusion/ej2-angular-grids/styles/material.css`. If this import is missing from your CSS file, the pager will render without any styling. Always include the full set of CSS imports — see [Getting Started CSS Imports](getting-started.md#css-imports) for the complete list.

## Enable Pagination

Enable paging with default settings:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-paging-grid',
  template: `
    <ejs-grid [dataSource]="data" [allowPaging]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class PagingGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    // ... more data
  ];
}
```

## Page Settings

Configure pagination with custom settings:

```typescript
import { Component } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-page-settings-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [allowPaging]="true"
              [pageSettings]="pageSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class PageSettingsGridComponent {
  pageSettings: PageSettingsModel = {
    pageSize: 15,              // Rows per page
    pageCount: 5,              // Page buttons to show
    currentPage: 1,            // Initial page
    enableQueryString: true    // Query string support
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    // ... 100+ more entries
  ];
}
```

## Pager Modes

Choose different pager display modes:

```typescript
import { Component } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-pager-modes-grid',
  template: `
    <p>Example: Dropdown pager mode with custom page sizes</p>
    <ejs-grid [dataSource]="data" 
              [allowPaging]="true"
              [pageSettings]="pageSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class PagerModesGridComponent {
  pageSettings: PageSettingsModel = {
    pageSize: 12,
    pageSizes: [5, 10, 12, 20, 50]  // Dropdown options
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET' },
    { OrderID: 10249, CustomerName: 'TOMSP' },
    // ... more data
  ];
}
```

## Paging Events

Respond to page changes:

```typescript
import { Component } from '@angular/core';
import { PageEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-paging-events-grid',
  template: `
    <div style="padding: 10px; background-color: #f0f0f0;">
      <p>Current Page: {{ currentPage }}, Total Pages: {{ totalPages }}</p>
    </div>
    <ejs-grid [dataSource]="data" 
              [allowPaging]="true"
              [pageSettings]="{ pageSize: 10 }"
              (actionComplete)="onPageChanged($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class PagingEventsGridComponent {
  currentPage = 1;
  totalPages = 1;

  data = [
    { OrderID: 10248, CustomerName: 'VINET' },
    { OrderID: 10249, CustomerName: 'TOMSP' },
    // ... more data (50+ rows)
  ];

  onPageChanged(args: PageEventArgs) {
    console.log('Page changed to:', args.currentPage);
    this.currentPage = args.currentPage || 1;
  }
}
```
