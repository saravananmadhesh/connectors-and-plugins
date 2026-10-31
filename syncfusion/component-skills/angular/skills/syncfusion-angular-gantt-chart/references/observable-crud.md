# Observable CRUD in Angular Gantt Chart

## Overview

The Angular Gantt Chart component supports Observable-based data binding for reactive data updates.
Use the `async` pipe to bind the Gantt data source to an Observable that emits an object with:

- `result`: the current task collection
- `count`: the total number of records

This structure is required for CRUD scenarios and for server-side data operations such as sorting and filtering.

## Bind Observable data

Bind the Gantt Chart to an Observable and load the initial dataset through the service.

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { Observable } from 'rxjs';
import { TaskStoreService } from './task-store.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	public tasks!: Observable<DataStateChangeEventArgs>;
	public editSettings: object;
	public projectStartDate: Date;
	public projectEndDate: Date;
	public toolbar: string[];
	public taskFields: object;

	@ViewChild('gantt', { static: false })
	public gantt!: GanttComponent;

	constructor(private taskService: TaskStoreService) {
		this.tasks = this.taskService;
	}

	ngOnInit(): void {
		this.taskFields = {
			id: 'id',
			name: 'TaskName',
			startDate: 'StartDate',
			endDate: 'EndDate',
			duration: 'Duration',
			progress: 'Progress',
			parentID: 'ParentID'
		};

		this.editSettings = {
			allowAdding: true,
			allowEditing: true,
			allowDeleting: true,
			allowTaskbarEditing: true
		};

		this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
		this.projectStartDate = new Date('02/09/2026');
		this.projectEndDate = new Date('08/08/2026');

		this.taskService.execute({ skip: 0, take: 24 });
	}
}
```

```html
<ejs-gantt
	#gantt
	[dataSource]="tasks | async"
	[taskFields]="taskFields"
	[editSettings]="editSettings"
	[toolbar]="toolbar"
	[allowSelection]="true"
	height="570"
	[projectStartDate]="projectStartDate"
	[projectEndDate]="projectEndDate"
	(dataSourceChanged)="dataSourceChanged($event)"
	(dataStateChange)="dataStateChange($event)">
</ejs-gantt>
```

## Handle CRUD operations

Use the `dataSourceChanged` event to process add, edit, and delete actions.
After the service completes the operation, call `endEdit()` to finalize the update in the Gantt Chart.

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { DataSourceChangedEventArgs } from '@syncfusion/ej2-grids';
import { Observable } from 'rxjs';
import { TaskStoreService } from './task-store.service';
import { TaskModel } from './task-model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	public tasks!: Observable<DataStateChangeEventArgs>;
	public editSettings: object;
	public projectStartDate: Date;
	public projectEndDate: Date;
	public toolbar: string[];
	public taskFields: object;

	@ViewChild('gantt', { static: false })
	public gantt!: GanttComponent;

	constructor(private taskService: TaskStoreService) {
		this.tasks = this.taskService;
	}

	public dataSourceChanged(args: DataSourceChangedEventArgs): void {
		if (args.action === 'add') {
			const task = { ...(args.data as any).taskData } as TaskModel;
			this.taskService.addRecord(task).subscribe(() => args.endEdit());
		}

		if (args.action === 'edit') {
			const task = { ...(args.data as any).taskData } as TaskModel;
			this.taskService.updateRecord(task).subscribe(() => args.endEdit());
		}

		if (args.requestType === 'delete') {
			const deletedRecords = args.data as any[];
			if (deletedRecords.length === 1) {
				const id = deletedRecords[0]?.taskData?.id ?? deletedRecords[0]?.id;
				if (id !== undefined && id !== null) {
					this.taskService.deleteRecord(id).subscribe(() => args.endEdit());
				}
			} else {
				this.taskService.deleteMultipleRecords(deletedRecords).subscribe(() => args.endEdit());
			}
		}
	}

	ngOnInit(): void {
		this.taskFields = {
			id: 'id',
			name: 'TaskName',
			startDate: 'StartDate',
			endDate: 'EndDate',
			duration: 'Duration',
			progress: 'Progress',
			parentID: 'ParentID'
		};

		this.editSettings = {
			allowAdding: true,
			allowEditing: true,
			allowDeleting: true,
			allowTaskbarEditing: true
		};

		this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
		this.projectStartDate = new Date('02/09/2026');
		this.projectEndDate = new Date('08/08/2026');
		this.taskService.execute({ skip: 0, take: 24 });
	}
}
```

```html
<ejs-gantt
	#gantt
	[dataSource]="tasks | async"
	[taskFields]="taskFields"
	[editSettings]="editSettings"
	[toolbar]="toolbar"
	[allowSelection]="true"
	height="570"
	[projectStartDate]="projectStartDate"
	[projectEndDate]="projectEndDate"
	(dataSourceChanged)="dataSourceChanged($event)">
</ejs-gantt>
```

### Service implementation for CRUD

Update the backing data in the service and emit the refreshed payload through the Observable.
The emitted value should always follow the `{ result, count }` pattern.

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { TaskModel } from './task-model';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class TaskStoreService extends BehaviorSubject<DataStateChangeEventArgs> {
	private apiUrl = 'api/tasks';

	constructor(private http: HttpClient) {
		super({ result: [], count: 0 } as DataStateChangeEventArgs);
	}

	public execute(state: any): void {
		if (!state) {
			return;
		}

		this.getTasks(state).subscribe(result => {
			super.next({
				result: result.result,
				count: result.count
			} as DataStateChangeEventArgs);
		});
	}

	private getTasks(state?: any): Observable<{ result: TaskModel[]; count: number }> {
		return this.http.get<TaskModel[]>(this.apiUrl).pipe(
			map((data: TaskModel[]) => ({
				result: state?.take ? data.slice(state.skip, state.skip + state.take) : data,
				count: data.length
			}))
		);
	}

	public addRecord(task: TaskModel): Observable<TaskModel> {
		return this.http.post<TaskModel>(this.apiUrl, task, httpOptions);
	}

	public updateRecord(task: TaskModel): Observable<TaskModel> {
		return this.http.put<TaskModel>(`${this.apiUrl}/${task.id}`, task, httpOptions);
	}

	public deleteRecord(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`, httpOptions);
	}

	public deleteMultipleRecords(records: any[]): Observable<any> {
		const deleteCalls = records.map(record => this.http.delete(`${this.apiUrl}/${record.id}`, httpOptions));
		return forkJoin(deleteCalls);
	}
}
```

## Handle sorting and filtering with Observable data

Sorting and filtering are not applied automatically when using Observable binding.
Handle the `dataStateChange` event and re-query the service with the current state object.

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { Observable } from 'rxjs';
import { TaskStoreService } from './task-store.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	public tasks!: Observable<DataStateChangeEventArgs>;
	public editSettings: object;
	public projectStartDate: Date;
	public projectEndDate: Date;
	public toolbar: string[];
	public taskFields: object;

	@ViewChild('gantt', { static: false })
	public gantt!: GanttComponent;

	constructor(private taskService: TaskStoreService) {
		this.tasks = this.taskService;
	}

	public dataStateChange(state: DataStateChangeEventArgs): void {
		this.taskService.execute(state);
	}

	ngOnInit(): void {
		this.taskFields = {
			id: 'id',
			name: 'TaskName',
			startDate: 'StartDate',
			endDate: 'EndDate',
			duration: 'Duration',
			progress: 'Progress',
			parentID: 'ParentID'
		};

		this.editSettings = {
			allowAdding: true,
			allowEditing: true,
			allowDeleting: true,
			allowTaskbarEditing: true
		};

		this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
		this.projectStartDate = new Date('02/09/2026');
		this.projectEndDate = new Date('08/08/2026');
		this.taskService.execute({ skip: 0, take: 24 });
	}
}
```

```html
<ejs-gantt
	#gantt
	[dataSource]="tasks | async"
	[taskFields]="taskFields"
	[editSettings]="editSettings"
	[toolbar]="toolbar"
	[allowSelection]="true"
	height="570"
	[projectStartDate]="projectStartDate"
	[projectEndDate]="projectEndDate"
	(dataStateChange)="dataStateChange($event)">
</ejs-gantt>
```

## Best practices

- Emit `{ result, count }` from the service for all Observable updates.
- Call `endEdit()` after each CRUD request completes.
- Use `dataSourceChanged` for create, update, and delete actions.
- Use `dataStateChange` for sorting and filtering requests.
- Keep the Gantt data source bound with the `async` pipe.

