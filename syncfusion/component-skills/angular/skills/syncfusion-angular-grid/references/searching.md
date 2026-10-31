# Searching

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Global Search](#global-search)
- [Custom Search Configuration](#custom-search-configuration)
- [Search with Highlighting](#search-with-highlighting)
- [Clear Search by External Button](#clear-search-by-external-button)

## When to Use This Skill

Use this skill when you need to:
- **Global search** — Search across all grid rows and columns
- **Search functionality** — Add search bar to grid toolbar
- **Custom search** — Configure which columns to search
- **Search highlighting** — Highlight matching text in results
- **Clear search** — Reset search with external button
- **Text highlighting** — Visual feedback for search matches
- **Quick data discovery** — Help users find specific rows quickly

## Overview

Search functionality allows users to find rows matching search text across multiple columns quickly. Grid provides global search with customizable options.

## Global Search

Enable search bar with text input:

```typescript
import { Component } from '@angular/core';
import { ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-search-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [toolbar]="toolbarItems"
              [allowPaging]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
        <e-column field="ShipAddress" headerText="Address" width="200"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class SearchGridComponent {
  toolbarItems: ToolbarItems[] = ['Search'];

  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims', ShipAddress: '59 rue de l\'Abbaye' },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München', ShipAddress: 'Luisenstr. 48' },
    { OrderID: 10250, CustomerName: 'HANAR', ShipCity: 'Rio de Janeiro', ShipAddress: 'Rua do Paço, 67' }
  ];
}
```

## Custom Search Configuration

Configure search with specific columns and operators:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-custom-search-grid',
  template: `
    <input type="text" placeholder="Search..." (keyup)="onSearch($event)" 
           style="padding: 8px; width: 300px; margin-bottom: 10px;">
    
    <ejs-grid #grid [dataSource]="data" 
              [searchSettings]="searchSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class CustomSearchGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  searchSettings: SearchSettingsModel = {
    fields: ['CustomerName', 'ShipCity'],  // Search in these columns only
    operator: 'contains',                   // 'contains', 'startswith', 'endswith'
    ignoreCase: true
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims' },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München' },
    { OrderID: 10250, CustomerName: 'HANAR', ShipCity: 'Rio de Janeiro' }
  ];

  onSearch(event: any) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.grid.search(searchValue);
  }
}
```

## Search with Highlighting

Highlight search results:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-highlighted-search-grid',
  template: `
    <input type="text" placeholder="Search and highlight..." [(ngModel)]="searchText"
           (keyup)="onSearch()" style="padding: 8px; width: 300px; margin-bottom: 10px;">
    
    <ejs-grid #grid [dataSource]="data"
              [allowSelection]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150">
          <ng-template #template let-data>
            <span>data.CustomerName</span>
          </ng-template>
        </e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150">
          <ng-template #template let-data>
            <span>data.ShipCity</span>
          </ng-template>
        </e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class HighlightedSearchGridComponent {
  @ViewChild('grid') grid!: GridComponent;
  searchText = '';

  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims' },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München' },
    { OrderID: 10250, CustomerName: 'HANAR', ShipCity: 'Rio de Janeiro' }
  ];

  onSearch() {
    if (this.searchText) {
      this.grid.search(this.searchText);
    } else {
      this.grid.clearSearching();
    }
  }

  highlightText(text: string): string {
    if (!this.searchText) return text;
    const regex = new RegExp(this.searchText, 'gi');
    return text.replace(regex, match => `<span style="background-color: yellow;">${match}</span>`);
  }
}
```

## Clear Search by External Button

Clear search results and reset the grid to display all records using an external button. This is useful for resetting search filters when a "Clear" or "Reset" button is clicked.

Implementation of clearing search results from an external button:

1. Set the [searchSettings.key](ej2.syncfusion.com/angular/documentation/api/grid/searchSettings#key) property to an empty string.
2. This property represents the current search text.
3. Setting it to empty clears the search text and resets the grid.

```typescript
import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridComponent, GridModule, SearchService, SearchSettingsModel, ToolbarItems, ToolbarService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-clear-search-grid',
  imports: [GridModule, ButtonModule],
  providers: [SearchService, ToolbarService],
  template: `
    <button ejs-button id='clear' (click)='clearSearch()'>Clear Search</button>
    
    <ejs-grid #grid style="margin-top:5px" 
              [dataSource]="data" 
              [searchSettings]="searchOptions" 
              [toolbar]="toolbarOptions" 
              height="260px">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" textAlign="Right" width="90"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="100"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="100"></e-column>
        <e-column field="ShipName" headerText="Ship Name" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ClearSearchGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  data = [
    { OrderID: 10248, CustomerID: 'VINET', ShipCity: 'Reims', ShipName: 'Vins et alcools Chevalier' },
    { OrderID: 10249, CustomerID: 'TOMSP', ShipCity: 'München', ShipName: 'Toms Spezialitäten' },
    { OrderID: 10250, CustomerID: 'HANAR', ShipCity: 'Rio de Janeiro', ShipName: 'Hanari Carnes' }
  ];

  toolbarItems: ToolbarItems[] = ['Search'];

  searchOptions: SearchSettingsModel = {
    fields: ['CustomerID'],
    operator: 'contains',
    key: 'Ha',
    ignoreCase: true
  };

  clearSearch() {
    this.grid.searchSettings.key = '';
  }
}
```

Alternatively, the search box's built-in clear icon also clears search results. When the search box has focus or contains text, clicking the clear icon removes the text and resets the grid to display all records.
```
