---
name: Observables
description: 'RxJS Observables in Syncfusion Angular TreeGrid - async pipe binding, data state changes, CRUD operations with observables, custom binding, and data service patterns.'
---

# Observables

RxJS Observables enable reactive data binding in TreeGrid with automatic subscription management, async operations, and real-time data updates.

## When to Use

Use Observables when you need to:
- **Reactive binding** — Bind TreeGrid to Observable streams
- **Async pipe** — Use *ngIf with async pipe for automatic subscription
- **Real-time updates** — Stream live data to TreeGrid
- **Angular best practices** — Use reactive patterns in Angular

## Table of Contents
- [Observable Data Binding](#observable-data-binding)
- [Data State Change Handling](#data-state-change-handling)
- [Filtering with Observables](#filtering-with-observables)
- [CRUD Operations with Observables](#crud-operations-with-observables)
- [Child Data Binding](#child-data-binding)
- [Aggregate Calculation](#aggregate-calculation)
- [Observable Without Async Pipe](#observable-ithout-async-pipe)
- [Error Handling with Observables](#error-handling-with-observables)

## Observable Data Binding

### Basic Observable Setup

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeGridComponent, DataStateChangeEventArgs, PageService } from '@syncfusion/ej2-angular-treegrid';
import { DataService } from './data.service';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data | async'
      idMapping='TaskID'
      parentIdMapping='ParentID'
      hasChildMapping='isParent'
      [allowPaging]='true'
      (dataStateChange)='onDataStateChange($event)'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
        <e-column field='Duration' headerText='Duration' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [PageService]
})
export class AppComponent implements OnInit {
  public data: Observable<DataStateChangeEventArgs>;
  
  constructor(private dataService: DataService) {
    this.data = dataService;
  }

  ngOnInit(): void {
    const state: any = { skip: 0, take: 10 };
    this.dataService.execute(state);
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    this.dataService.execute(state);
  }
}
```

### Create Observable Data Service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService extends Subject<DataStateChangeEventArgs> {
  
  private BASE_URL = 'url';

  constructor(private http: HttpClient) {
    super();
  }

  // Execute data operations
  public execute(state: any): void {
    if (state.requestType === 'expand') {
      this.getChildData(state).subscribe(x => super.next(x));
    } else {
      this.getData(state).subscribe(x => super.next(x));
    }
  }

  // Fetch main data with pagination, sorting, filtering
  public getData(state: any): Observable<DataStateChangeEventArgs> {
    const query = new Query();
    
    // Apply paging
    if (state.take && state.skip) {
      const pageIndex = state.skip / state.take + 1;
      query.page(pageIndex, state.take);
    }

    // Apply sorting
    if (state.sorted && state.sorted.length) {
      for (const sort of state.sorted) {
        const direction = sort.direction === 'descending' ? 'desc' : 'asc';
        query.sortBy(sort.name, direction);
      }
    }

    // Apply filtering
    if (state.where && state.where.length) {
      for (const filter of state.where) {
        query.where(filter.field, filter.operator, filter.value);
      }
    }

    return this.http.get<any>(this.BASE_URL).pipe(
      map((response: any[]) => {
        const result = new DataManager(response).executeLocal(query);
        return {
          result: result,
          count: response.length
        };
      })
    );
  }

  // Fetch child data for parent row
  public getChildData(state: any): Observable<DataStateChangeEventArgs> {
    const parentID = state.data.TaskID;
    return this.http.get<any>(`${this.BASE_URL}?parentID=${parentID}`).pipe(
      map((response: any[]) => ({
        result: response,
        count: response.length
      }))
    );
  }

  // Add new record
  public addRecord(state: any): Observable<any> {
    return this.http.post(this.BASE_URL, state.data);
  }

  // Update existing record
  public updateRecord(state: any): Observable<any> {
    const id = state.data.TaskID;
    return this.http.put(`${this.BASE_URL}/${id}`, state.data);
  }

  // Delete record
  public deleteRecord(state: any): Observable<any> {
    const id = state.data[0].TaskID;
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }
}
```

## Data State Change Handling

### Handle Paging, Sorting & Filtering

```typescript
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeGridComponent, DataStateChangeEventArgs, PageService, SortService, FiterService } from '@syncfusion/ej2-angular-treegrid';
import { DataService } from './data.service';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data | async'
      [allowPaging]='true'
      [allowSorting]='true'
      [allowFiltering]='true'
      (dataStateChange)='onDataStateChange($event)'>
    </ejs-treegrid>
  `,
  providers: [PageService, SortService, FiterService]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: Observable<DataStateChangeEventArgs>;

  constructor(private dataService: DataService) {
    this.data = dataService;
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    // Triggered on pagination, sorting, filtering
    console.log('State changed:', state);
    this.dataService.execute(state);
  }
}
```

### DataStateChangeEventArgs Properties

```typescript
// State object contains:
{
  skip: 0,           // Pagination offset
  take: 10,          // Page size
  sorted: [],        // Sort settings
  where: [],         // Filter conditions
  search: [],        // Search criteria
  requestType: 'paging' | 'sorting' | 'filtering' | 'expand',
  data: {},          // Row data (for expand)
  childData: [],     // Child data (for custom binding)
  childDataBind: () => void  // Method to bind child data
}
```

## Filtering with Observables

### Excel Filter with Observable

```typescript
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeGridComponent, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { DataService } from './data.service';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data | async'
      [allowFiltering]='true'
      [filterSettings]='{ type: "Excel" }'
      (dataStateChange)='onDataStateChange($event)'>
    </ejs-treegrid>
  `
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: Observable<DataStateChangeEventArgs>;

  constructor(private dataService: DataService) {
    this.data = dataService;
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    // Check if filter choice request
    if (state.action?.requestType === 'filterchoicerequest' || 
        state.action?.requestType === 'filtersearchbegin') {
      
      // Provide filter data source
      this.dataService.getData(state).subscribe(filterData => {
        state.dataSource(filterData);
      });
    } else {
      // Regular data operation
      this.dataService.execute(state);
    }
  }
}
```

## CRUD Operations with Observables

### Add, Edit, Delete with Observable

```typescript
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeGridComponent, DataStateChangeEventArgs, EditService } from '@syncfusion/ej2-angular-treegrid';
import { DataSourceChangedEventArgs } from '@syncfusion/ej2-grids';
import { DataService } from './data.service';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data | async'
      [editSettings]='{ mode: "Normal", allowEditing: true, allowAdding: true, allowDeleting: true }'
      (dataStateChange)='onDataStateChange($event)'
      (dataSourceChanged)='onDataSourceChanged($event)'>
    </ejs-treegrid>
  `,
  providers: [EditService]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: Observable<DataStateChangeEventArgs>;

  constructor(private dataService: DataService) {
    this.data = dataService;
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    this.dataService.execute(state);
  }

  onDataSourceChanged(state: DataSourceChangedEventArgs): void {
    if (state.action === 'add') {
      // Adding new record
      this.dataService.addRecord(state).subscribe({
        next: () => {
          state.endEdit();
          console.log('Record added');
        },
        error: (error) => {
          console.error('Add failed:', error);
        }
      });
    } else if (state.action === 'edit') {
      // Editing existing record
      this.dataService.updateRecord(state).subscribe({
        next: () => {
          state.endEdit();
          console.log('Record updated');
        },
        error: (error) => {
          console.error('Update failed:', error);
        }
      });
    } else if (state.requestType === 'delete') {
      // Deleting record
      this.dataService.deleteRecord(state).subscribe({
        next: () => {
          state.endEdit();
          console.log('Record deleted');
        },
        error: (error) => {
          console.error('Delete failed:', error);
        }
      });
    }
  }
}
```

## Child Data Binding

### Custom Child Data Binding with Observable

```typescript
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeGridComponent, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { DataService } from './data.service';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data | async'
      idMapping='TaskID'
      parentIdMapping='ParentID'
      hasChildMapping='isParent'
      (dataStateChange)='onDataStateChange($event)'>
    </ejs-treegrid>
  `
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: Observable<DataStateChangeEventArgs>;

  constructor(private dataService: DataService) {
    this.data = dataService;
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    if (state.requestType === 'expand') {
      // When parent row is expanded
      this.dataService.getChildData(state).subscribe(childRecords => {
        // Assign child data to state
        state.childData = childRecords.result;
        
        // Notify TreeGrid that child data is bound
        state.childDataBind();
      });
    } else {
      // For other operations (paging, sorting, filtering)
      this.dataService.execute(state);
    }
  }
}
```

### Programmatic Child Data Assignment

```typescript
onDataStateChange(state: DataStateChangeEventArgs): void {
  if (state.requestType === 'expand') {
    // Manually assign child data
    state.childData = [
      { TaskID: 101, TaskName: 'Subtask 1', ParentID: 1 },
      { TaskID: 102, TaskName: 'Subtask 2', ParentID: 1 },
      { TaskID: 103, TaskName: 'Subtask 3', ParentID: 1 }
    ];
    
    // Bind the data
    state.childDataBind();
  } else {
    this.dataService.execute(state);
  }
}
```

## Aggregate Calculation

### Calculate & Return Aggregates

```typescript
public getData(state: any): Observable<DataStateChangeEventArgs> {
  return this.http.get<any[]>(this.BASE_URL).pipe(
    map((response: any[]) => {
      // Calculate aggregates
      const sumDuration = response.reduce((sum, item) => sum + item.Duration, 0);
      const avgProgress = response.reduce((sum, item) => sum + item.Progress, 0) / response.length;

      return {
        result: response,
        count: response.length,
        aggregates: {
          'Duration - sum': sumDuration,
          'Progress - average': avgProgress
        }
      };
    })
  );
}
```

### Display Aggregates in Footer

```typescript
@Component({
  template: `
    <ejs-treegrid 
      [dataSource]='data | async'
      [aggregates]='aggregateSettings'>
      <!-- columns -->
    </ejs-treegrid>
  `
})
export class AppComponent {
  public aggregateSettings = [
    {
      field: 'Duration',
      type: ['Sum'],
      footerTemplate: 'Total Duration: ${Sum}'
    }
  ];
}
```

## Observable Without Async Pipe

### Manual Subscription Management

```typescript
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TreeGridComponent, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { DataService } from './data.service';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='gridData'
      (dataStateChange)='onDataStateChange($event)'>
    </ejs-treegrid>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  
  public gridData: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Manually subscribe without async pipe
    this.dataService.subscribe((data: DataStateChangeEventArgs) => {
      this.gridData = data.result || [];
    });

    // Initialize data
    const state: any = { skip: 0, take: 10 };
    this.dataService.execute(state);
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    this.dataService.execute(state);
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## Error Handling with Observables

### Observable Error Handling

```typescript
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class DataService extends Subject<DataStateChangeEventArgs> {
  
  public execute(state: any): void {
    this.getData(state)
      .pipe(
        catchError((error) => {
          console.error('Data loading error:', error);
          // Return empty result on error
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (data) => super.next(data),
        error: (error) => {
          console.error('Failed to load data:', error.message);
          // Optionally emit empty data
          super.next({ result: [], count: 0 });
        }
      });
  }
}
```

## Best Practices

### Do's ✅

```typescript
// 1. Initialize data in ngOnInit
ngOnInit(): void {
  const state = { skip: 0, take: 10 };
  this.dataService.execute(state);
}

// 2. Handle all state change types
onDataStateChange(state: DataStateChangeEventArgs): void {
  this.dataService.execute(state);
}

// 3. Use catchError for error handling
getData(state: any): Observable<any> {
  return this.http.get(this.url).pipe(
    catchError(error => {
      console.error(error);
      return of({ result: [], count: 0 });
    })
  );
}

// 4. Call endEdit() for CRUD operations
onDataSourceChanged(state: DataSourceChangedEventArgs): void {
  this.dataService.updateRecord(state).subscribe({
    next: () => {
      state.endEdit();
    }
  });
}
```

### Don'ts ❌

```typescript
// 1. Don't forget childDataBind() after assigning child data
// WRONG:
state.childData = childData;  // Missing childDataBind()

// CORRECT:
state.childData = childData;
state.childDataBind();

// 2. Don't forget to unsubscribe in ngOnDestroy
// 3. Don't make multiple observable calls for single operation
// 4. Don't ignore error responses from server
```
