---
name: Column Chooser
description: 'Column Chooser in Syncfusion Angular TreeGrid - dynamically show/hide columns, column visibility control, programmatic column management, and column state persistence.'
---

# Column Chooser

Column Chooser allows users to dynamically show or hide columns at runtime through a user-friendly dialog interface.

## When to Use

Use Column Chooser when you need to:
- **Control column visibility** — Let users show/hide columns as needed
- **Personalize view** — Let users customize their preferred column layout
- **Default columns** — Define which columns are visible by default
- **Dialog interface** — Provide accessible column management UI

## Table of Contents
- [Enable Column Chooser](#enable-column-chooser)
- [Hide Column in Column Chooser](#hide-column-in-column-chooser)
- [Open Column Chooser Externally](#open-column-chooser-externally)
- [Custom Column Chooser Templates](#custom-column-chooser-templates)

## Enable Column Chooser

```typescript
import { Component } from '@angular/core';
import { ColumnChooserService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [toolbar]='toolbar'
      [showColumnChooser]='true'>
    </ejs-treegrid>
  `,
  providers: [ColumnChooserService, ToolbarService]
})
export class AppComponent {
  public data: Object[] = [];
  public toolbar: string[] = ['ColumnChooser'];
}
```

## Hide Column in Column Chooser

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent, ColumnChooserService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [toolbar]='toolbar'
      [showColumnChooser]='true'
      childMapping='subtasks'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' [isPrimaryKey]='true' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' [showInColumnChooser]='false' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [ColumnChooserService, ToolbarService]
})
export class AppComponent {
  public data: Object[] = [];
  public toolbar: string[] = ['ColumnChooser'];
}
```

## Open Column Chooser Externally

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent, ColumnChooserService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <button (click)='openColumnChooser()' class='e-btn e-flat'>Open Column Chooser</button>
    
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [showColumnChooser]='true'
      childMapping='subtasks'>
    </ejs-treegrid>
  `,
  providers: [ColumnChooserService, ToolbarService]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: Object[] = [];

  openColumnChooser(): void {
    // Open column chooser at X: 200, Y: 50 coordinates
    (this.treegrid as TreeGridComponent).columnChooserModule.openColumnChooser(200, 50);
  }
}
```

## Custom Column Chooser Templates

### Using Header, Content, and Footer Templates

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent, ColumnChooserService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [toolbar]='toolbar'
      [showColumnChooser]='true'
      childMapping='subtasks'>
      
      <!-- Custom Header Template -->
      <ng-template #columnChooserSettingsHeaderTemplate>
        <div style='padding: 10px;'>
          <h4>Column Options</h4>
        </div>
      </ng-template>
      
      <!-- Custom Content Template -->
      <ng-template #columnChooserSettingsTemplate let-data>
        <div *ngIf='!(data && data.columns && data.columns.length)' class='no-record-text'>
          No Columns Found
        </div>
        <div *ngIf='(data && data.columns && data.columns.length)'>
          <div *ngFor='let column of data.columns' style='padding: 5px;'>
            <input type='checkbox' [checked]='column.visible' />
            <label>{{ column.headerText }}</label>
          </div>
        </div>
      </ng-template>
      
      <!-- Custom Footer Template -->
      <ng-template #columnChooserSettingsFooterTemplate>
        <div style='padding: 10px; border-top: 1px solid #ddd;'>
          <button (click)='applyChanges()' class='e-btn e-primary'>Apply</button>
          <button (click)='closeDialog()' class='e-btn'>Close</button>
        </div>
      </ng-template>
    </ejs-treegrid>
  `,
  providers: [ColumnChooserService, ToolbarService],
  standalone: true,
  imports: [ButtonModule, NgIf]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: Object[] = [];
  public toolbar: string[] = ['ColumnChooser'];

  applyChanges(): void {
    // Apply custom logic for column visibility changes
    console.log('Applying column changes...');
  }

  closeDialog(): void {
    // Close the column chooser dialog
    (this.treegrid as TreeGridComponent).grid.columnChooserModule.hideDialog();
  }
}
```