# Data Binding in Angular Accordion

## Table of Contents
- [Overview](#overview)
- [DataSource API Property](#datasource-api-property)
- [Basic Array Binding](#basic-array-binding)
- [Object Array Binding](#object-array-binding)
- [DataManager and OData Integration](#datamanager-and-odata-integration)
- [Handling Response Data](#handling-response-data)
- [Refresh After Updates](#refresh-after-updates)

## Overview

Data binding connects your accordion items to data sources, enabling:
- Loading accordion items from arrays
- Fetching data from OData services
- Dynamic data transformation
- Real-time content updates

The accordion uses `header` and `content` properties to map data fields to item headers and content.

## DataSource API Property

### `dataSource` Property
**Type:** `DataManager | Object[]`

Specifies the data source for accordion items. Can be:
- Local array of objects
- `DataManager` instance for OData/REST API binding
- Remote data URL

**Examples:**

```typescript
// Local array
dataSource = [
  { header: 'Item 1', content: 'Content 1' },
  { header: 'Item 2', content: 'Content 2' }
];

<ejs-accordion [dataSource]="dataSource"></ejs-accordion>
```

```typescript
// DataManager with OData
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

public dataSource = new DataManager({
  url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Customers',
  adaptor: new ODataV4Adaptor()
});

<ejs-accordion [dataSource]="dataSource"></ejs-accordion>
```

### Property Mapping for dataSource

When using `dataSource`, map your data fields to accordion properties using `e-accordionitem`:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datasource',
  standalone: true,
  imports: [AccordionModule, CommonModule],
  template: `
    <ejs-accordion [dataSource]="dataSource">
      <e-accordionitems>
        <e-accordionitem 
          textContent="name" 
          [content]="'description'">
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {
  public dataSource = [
    { name: 'Product A', description: 'Description for Product A' },
    { name: 'Product B', description: 'Description for Product B' },
    { name: 'Product C', description: 'Description for Product C' }
  ];
}
```

### `items` vs `dataSource` Properties

| Aspect | `items` | `dataSource` |
|--------|--------|--------------|
| **Type** | `AccordionItemModel[]` | `DataManager \| Object[]` |
| **Best For** | Simple static/dynamic arrays | OData/REST API integration |
| **Binding** | Direct property binding | Property mapping support |
| **Remote Data** | Manual handling | Built-in support |
| **Usage** | `[items]="myArray"` | `[dataSource]="myDataManager"` |

### `items` Property
**Type:** `AccordionItemModel[]`

Direct array of accordion items with full control over each property.

**Example:**
```typescript
public items: AccordionItemModel[] = [
  { 
    header: 'Item 1', 
    content: 'Content 1',
    expanded: true,
    disabled: false,
    cssClass: 'custom-item'
  }
];

<ejs-accordion [items]="items"></ejs-accordion>
```

## Basic Array Binding

### Simple String Array

Bind accordion items directly to an array of objects:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion [items]="accordionItems"></ejs-accordion>`
})
export class AppComponent {
  public accordionItems = [
    {
      header: 'ASP.NET',
      content: 'Microsoft ASP.NET is a set of technologies...',
      expanded: true
    },
    {
      header: 'ASP.NET MVC',
      content: 'The Model-View-Controller (MVC) pattern...'
    },
    {
      header: 'JavaScript',
      content: 'JavaScript is an interpreted programming language...'
    }
  ];
}
```

### Dynamic Array

Update items array at runtime:

```typescript
import { Component, OnInit } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion [items]="accordionItems"></ejs-accordion>`
})
export class AppComponent implements OnInit {
  public accordionItems: any[] = [];

  ngOnInit() {
    // Load data on component initialization
    this.loadData();
  }

  loadData() {
    this.accordionItems = [
      { header: 'Q1 Results', content: 'First quarter performance data' },
      { header: 'Q2 Results', content: 'Second quarter performance data' },
      { header: 'Q3 Results', content: 'Third quarter performance data' }
    ];
  }
}
```

## Object Array Binding

### Mapping Custom Properties

Map your data object properties to accordion header and content:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion [items]="employees"></ejs-accordion>`
})
export class AppComponent {
  public employees = [
    {
      // Map 'name' to header, 'department' to content
      header: 'John Smith',
      content: 'Engineering Department - Senior Developer'
    },
    {
      header: 'Jane Doe',
      content: 'Sales Department - Account Manager'
    },
    {
      header: 'Michael Johnson',
      content: 'HR Department - Recruiter'
    }
  ];
}
```

### Dynamic Property Mapping

Transform data structure to match accordion requirements:

```typescript
import { Component, OnInit } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion [items]="accordionItems"></ejs-accordion>`
})
export class AppComponent implements OnInit {
  public accordionItems: any[] = [];

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    const employees: Employee[] = [
      { id: 1, firstName: 'John', lastName: 'Smith', role: 'Developer', department: 'Engineering' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', role: 'Manager', department: 'Sales' },
      { id: 3, firstName: 'Mike', lastName: 'Johnson', role: 'Recruiter', department: 'HR' }
    ];

    // Transform to accordion format
    this.accordionItems = employees.map(emp => ({
      header: `${emp.firstName} ${emp.lastName}`,
      content: `${emp.role} in ${emp.department} Department`,
      expanded: emp.id === 1  // First item expanded
    }));
  }
}
```

## DataManager and OData Integration

### Install Required Packages

Ensure both packages are installed:

```bash
npm install @syncfusion/ej2-angular-navigations @syncfusion/ej2-data --save
```

### Fetch Data from OData Service

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { DataManager, Query, ODataV4Adaptor, ReturnOption } from '@syncfusion/ej2-data';

const SERVICE_URI = 'https://services.odata.org/V4/Northwind/Northwind.svc/Employees';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion #accordion></ejs-accordion>`
})
export class AppComponent implements OnInit {
  @ViewChild('accordion') accordionObj?: AccordionComponent;
  public itemsData: any[] = [];
  public mapping = { header: 'FirstName', content: 'Notes' };

  ngOnInit() {
    this.loadODataEmployees();
  }

  loadODataEmployees() {
    // Create DataManager with OData service
    new DataManager({ 
      url: SERVICE_URI, 
      adaptor: new ODataV4Adaptor() 
    })
      .executeQuery(new Query().range(1, 4))  // Fetch first 4 employees
      .then((e: ReturnOption) => {
        let result: any = e.result;

        // Transform OData response to accordion format
        for (let i = 0; i < result.length; i++) {
          this.itemsData.push({
            header: result[i][this.mapping.header],
            content: result[i][this.mapping.content],
            expanded: i === 0  // First item expanded
          });
        }

        // Set items on accordion
        if (this.accordionObj) {
          this.accordionObj.items = this.itemsData;
          this.accordionObj.refresh();
        }
      });
  }
}
```

### OData Query Examples

**Fetch specific number of records:**
```typescript
.executeQuery(new Query().range(0, 10))  // First 10 records
```

**Filter records:**
```typescript
.executeQuery(new Query().where('City', 'equal', 'Seattle'))
```

**Sort records:**
```typescript
.executeQuery(new Query().sortBy('FirstName', 'ascending'))
```

**Combine queries:**
```typescript
.executeQuery(
  new Query()
    .where('City', 'equal', 'Seattle')
    .sortBy('LastName')
    .range(0, 5)
)
```

### REST API Data Binding

Fetch data from your custom REST API:

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion #accordion [items]="accordionItems"></ejs-accordion>`
})
export class AppComponent implements OnInit {
  @ViewChild('accordion') accordionObj?: AccordionComponent;
  public accordionItems: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadApiData();
  }

  loadApiData() {
    this.http.get<ApiResponse[]>('/api/articles')
      .subscribe(
        (data: ApiResponse[]) => {
          this.accordionItems = data.map(item => ({
            header: item.title,
            content: item.description,
            expanded: false
          }));
        },
        (error) => {
          console.error('Error loading data:', error);
        }
      );
  }
}
```

## Handling Response Data

### Transform Complex Response

When API returns nested or complex data structures:

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { HttpClient } from '@angular/common/http';

interface ComplexResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    details: string;
    metadata?: { category: string };
  }[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion #accordion [items]="accordionItems"></ejs-accordion>`
})
export class AppComponent implements OnInit {
  @ViewChild('accordion') accordionObj?: AccordionComponent;
  public accordionItems: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadComplexData();
  }

  loadComplexData() {
    this.http.get<ComplexResponse>('/api/categories')
      .subscribe(
        (response: ComplexResponse) => {
          if (response.success) {
            // Extract data array and transform
            this.accordionItems = response.data.map((item, index) => ({
              header: `${item.name} (${item.metadata?.category || 'General'})`,
              content: item.details,
              expanded: index === 0
            }));
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
}
```

### Error Handling

```typescript
loadData() {
  this.http.get('/api/accordion-items')
    .subscribe(
      (data: any[]) => {
        // Success: transform and set data
        this.accordionItems = this.transformData(data);
      },
      (error: any) => {
        // Error handling
        console.error('Failed to load data:', error.message);
        // Set fallback data or show error message
        this.accordionItems = [{
          header: 'Error',
          content: 'Failed to load accordion data. Please try again later.'
        }];
      }
    );
}

private transformData(data: any[]): any[] {
  return data.map(item => ({
    header: item.title || 'Untitled',
    content: item.body || 'No content available',
    expanded: false
  }));
}
```

## Refresh After Updates

### Refresh Accordion After Data Changes

When data changes, refresh the accordion to reflect updates:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <button (click)="updateData()">Update Data</button>
    <ejs-accordion #accordion [items]="accordionItems"></ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;
  public accordionItems = [
    { header: 'Item 1', content: 'Original content 1' },
    { header: 'Item 2', content: 'Original content 2' }
  ];

  updateData() {
    // Modify data
    this.accordionItems[0].content = 'Updated content 1';
    this.accordionItems[1].content = 'Updated content 2';

    // Refresh accordion to reflect changes
    if (this.accordionObj) {
      this.accordionObj.refresh();
    }
  }
}
```

### Replace Entire Dataset

```typescript
replaceDataset() {
  // New data from API or calculation
  this.accordionItems = [
    { header: 'New Item 1', content: 'New content 1', expanded: true },
    { header: 'New Item 2', content: 'New content 2' },
    { header: 'New Item 3', content: 'New content 3' }
  ];

  // Refresh to apply changes
  if (this.accordionObj) {
    this.accordionObj.items = this.accordionItems;
    this.accordionObj.refresh();
  }
}
```

### Real-Time Updates

For constantly updating data (WebSocket, polling):

```typescript
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion #accordion [items]="accordionItems"></ejs-accordion>`
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('accordion') accordionObj?: AccordionComponent;
  public accordionItems: any[] = [];
  private destroy$ = new Subject<void>();

  ngOnInit() {
    // Poll for updates every 5 seconds
    interval(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.refreshData());
  }

  refreshData() {
    // Fetch latest data
    fetch('/api/live-data')
      .then(res => res.json())
      .then(data => {
        this.accordionItems = data.map((item: any) => ({
          header: item.title,
          content: item.description,
          expanded: false
        }));
        
        // Refresh accordion
        this.accordionObj?.refresh();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

