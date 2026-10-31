# Advanced Patterns & How-To in Angular AutoComplete

## Table of Contents
- [Autofill While Filtering](#autofill-while-filtering)
- [Highlight Searched Characters](#highlight-searched-characters)
- [Custom Filtering by Multiple Fields](#custom-filtering-by-multiple-fields)
- [Icon Support in List Items](#icon-support-in-list-items)
- [Suggestion List on Focus from Local Storage](#suggestion-list-on-focus-from-local-storage)
- [Programmatic Popup Control](#programmatic-popup-control)
- [Add Items Dynamically](#add-items-dynamically)
- [Get Data by Value](#get-data-by-value)

---

## Autofill While Filtering

Enable `autofill` to automatically complete the input with the first matching suggestion. Works best with `filterType="StartsWith"`:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="searchData"
      [fields]="fields"
      [autofill]="true"
      placeholder="Find a country">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public searchData: { [key: string]: Object }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda',   Code: 'BM' },
    { Name: 'Canada',    Code: 'CA' },
    { Name: 'Cameroon',  Code: 'CM' },
    { Name: 'Denmark',   Code: 'DK' },
    { Name: 'France',    Code: 'FR' },
    { Name: 'Finland',   Code: 'FI' },
    { Name: 'Germany',   Code: 'DE' },
    { Name: 'India',     Code: 'IN' },
    { Name: 'United Kingdom', Code: 'GB' },
    { Name: 'United States',  Code: 'US' }
  ];
  public fields: Object = { value: 'Name' };
}
```

**Behavior:** If the user types `Can`, the input shows `Canada` with `ada` highlighted as the autocompleted portion. If no match is found, no completion is shown.

---

## Highlight Searched Characters

Enable `highlight` to visually emphasize matched characters in the suggestion list using the `.e-highlight` CSS class:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="searchData"
      [fields]="fields"
      [highlight]="true"
      placeholder="Find a country">
    </ejs-autocomplete>
  `,
  styles: [`
    /* Custom highlight styling */
    ::ng-deep .e-highlight {
      font-weight: 700;
      color: #1565c0;
    }
  `]
})
export class AppComponent {
  public searchData: { [key: string]: Object }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda',   Code: 'BM' },
    { Name: 'Canada',    Code: 'CA' },
    { Name: 'Denmark',   Code: 'DK' },
    { Name: 'France',    Code: 'FR' }
  ];
  public fields: Object = { value: 'Name' };
}
```

---

## Custom Filtering by Multiple Fields

Use the `filtering` event with `Predicate` to filter on more than one data field simultaneously:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="ddlelement"
      [dataSource]="searchData"
      [fields]="fields"
      [itemTemplate]="itemTemplate"
      [query]="query"
      (filtering)="onFiltering($event)"
      placeholder="Search by name or code">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public searchData: { [key: string]: Object }[] = [
    { Name: 'Australia',     Code: 'AU' },
    { Name: 'Bermuda',       Code: 'BM' },
    { Name: 'Canada',        Code: 'CA' },
    { Name: 'Cameroon',      Code: 'CM' },
    { Name: 'Denmark',       Code: 'DK' },
    { Name: 'France',        Code: 'FR' },
    { Name: 'Finland',       Code: 'FI' },
    { Name: 'Germany',       Code: 'DE' },
    { Name: 'United Kingdom',Code: 'GB' },
    { Name: 'United States', Code: 'US' }
  ];
  public fields: Object = { value: 'Code', text: 'Name' };
  public itemTemplate: string = '<span><span class="name">${Name}</span> - <span class="code">${Code}</span></span>';
  public query: Query = new Query();

  public onFiltering(e: FilteringEventArgs): void {
    // Prevent built-in filtering
    e.preventDefaultAction = true;

    // Build OR predicate: matches if Name OR Code contains typed text
    let predicate = new Predicate('Name', 'contains', e.text);
    predicate = predicate.or('Code', 'contains', e.text);

    let query = new Query();
    query = (e.text !== '') ? query.where(predicate) : query;

    // Update the popup with filtered results
    e.updateData(this.searchData, query);
  }
}
```

**Use case:** Let users type either a country name ("Canada") or its code ("CA") to find the same item.

---

## Icon Support in List Items

Map a CSS class column using `fields.iconCss` to display icons alongside suggestion text:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="sortFormatData"
      [fields]="fields"
      placeholder="Find a format">
    </ejs-autocomplete>
  `,
  styles: [`
    /* Define icon classes (replace with your icon font or SVG) */
    .asc-sort::before  { content: '↑'; margin-right: 6px; }
    .dsc-sort::before  { content: '↓'; margin-right: 6px; }
    .filter::before    { content: '⊿'; margin-right: 6px; }
    .clear::before     { content: '✕'; margin-right: 6px; }
  `]
})
export class AppComponent {
  public sortFormatData: { [key: string]: Object }[] = [
    { Class: 'asc-sort', Type: 'Sort A to Z',  Id: '1' },
    { Class: 'dsc-sort', Type: 'Sort Z to A',  Id: '2' },
    { Class: 'filter',   Type: 'Filter',        Id: '3' },
    { Class: 'clear',    Type: 'Clear',          Id: '4' }
  ];
  // 'iconCss' creates a <span> with the mapped class name before each item
  public fields: Object = { value: 'Type', iconCss: 'Class' };
}
```

The `iconCss` field adds a `<span>` element with the mapped class to each list item — use any icon font (Font Awesome, Material Icons, etc.) or custom CSS.

---

## Suggestion List on Focus from Local Storage

Show previously searched/selected values as suggestions when the AutoComplete is focused (browser history-style autocomplete):

```typescript
import { Component, ViewChild } from '@angular/core';
import { AutoCompleteModule, AutoCompleteComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="country"
      #local
      [dataSource]="countries"
      [fields]="localFields"
      (change)="onChange()"
      (filtering)="onFiltering($event)"
      (focus)="onFocus()">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  @ViewChild('local') public localObj!: AutoCompleteComponent;

  public suggestList: string[] = [];
  public countries: { [key: string]: Object }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda',   Code: 'BM' },
    { Name: 'Canada',    Code: 'CA' },
    { Name: 'Cameroon',  Code: 'CM' },
    { Name: 'Denmark',   Code: 'DK' },
    { Name: 'France',    Code: 'FR' },
    { Name: 'Finland',   Code: 'FI' }
  ];
  public localFields: Object = { value: 'Name' };

  // When a value is selected or typed, store it in local storage
  onChange(): void {
    localStorage.setItem('value', this.localObj.value as string);
    const stored = localStorage.getItem('value');
    if (stored && stored !== 'null') {
      this.suggestList.push(stored);
      // Remove duplicates
      this.suggestList = [...new Set(this.suggestList)];
    }
  }

  // On focus, show previously stored values as suggestions
  onFocus(): void {
    if (this.suggestList.length > 0) {
      (this.localObj.dataSource as any) = this.suggestList;
      this.localObj.dataBind();
      // Trigger opening the popup
      const keyEventArgs: any = {
        preventDefault: (): void => {},
        action: 'down',
        keyCode: 40,
        type: null
      };
      (this.localObj as any).onFilterUp(keyEventArgs);
      (this.localObj as any).popupObj.element.classList.add('e-suggestion');
    }
  }

  // During filtering, use the main dataset and remove suggestion styling
  onFiltering(e: FilteringEventArgs): void {
    let query = new Query();
    query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
    e.updateData(this.countries, query);
    (this.localObj as any).popupObj.element.classList.remove('e-suggestion');
  }
}
```

---

## Programmatic Popup Control

Use `showPopup()` and `hidePopup()` methods to control the suggestion popup from code:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AutoCompleteModule, AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete #auto [dataSource]="data" placeholder="Find a game">
    </ejs-autocomplete>
    <button (click)="openPopup()">Open Popup</button>
    <button (click)="closePopup()">Close Popup</button>
  `
})
export class AppComponent {
  @ViewChild('auto') public autoObj!: AutoCompleteComponent;
  public data: string[] = ['Badminton', 'Cricket', 'Football', 'Golf', 'Hockey'];

  openPopup(): void {
    this.autoObj.showPopup();
  }

  closePopup(): void {
    this.autoObj.hidePopup();
  }
}
```

---

## Add Items Dynamically

Use `addItem()` to insert new items into the suggestion list at runtime:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AutoCompleteModule, AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete #auto [dataSource]="data" placeholder="Find a game">
    </ejs-autocomplete>
    <button (click)="addNewItem()">Add "Volleyball"</button>
  `
})
export class AppComponent {
  @ViewChild('auto') public autoObj!: AutoCompleteComponent;
  public data: string[] = ['Badminton', 'Cricket', 'Football'];

  addNewItem(): void {
    // Append at end (no index) or specify position
    this.autoObj.addItem('Volleyball' as any);
  }
}
```

---

## Get Data by Value

Use `getDataByValue()` to retrieve the full data object for a given value string:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AutoCompleteModule, AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      #auto
      [dataSource]="sportsData"
      [fields]="fields"
      placeholder="Find a game"
      (select)="onSelect($event)">
    </ejs-autocomplete>
    <div *ngIf="selectedItem">
      Selected ID: {{ selectedItem['Id'] }}
    </div>
  `
})
export class AppComponent {
  @ViewChild('auto') public autoObj!: AutoCompleteComponent;
  public selectedItem: { [key: string]: Object } | null = null;

  public sportsData: { [key: string]: Object }[] = [
    { Id: 'Game1', Game: 'Badminton' },
    { Id: 'Game2', Game: 'Cricket' },
    { Id: 'Game3', Game: 'Football' }
  ];
  public fields: Object = { value: 'Game' };

  onSelect(e: any): void {
    const data = this.autoObj.getDataByValue(e.value);
    this.selectedItem = data as { [key: string]: Object };
  }
}
```
