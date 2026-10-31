# How-To Recipes for Angular DropDownList

## Table of Contents
- [Add Item Dynamically](#add-item-dynamically)
- [Remove an Item](#remove-an-item)
- [Clear the Selected Item](#clear-the-selected-item)
- [Close Popup Programmatically](#close-popup-programmatically)
- [Cascading DropDownLists](#cascading-dropdownlists)
- [Customize Group Header](#customize-group-header)
- [Highlight Filtered Characters](#highlight-filtered-characters)
- [Incremental Search](#incremental-search)
- [Modify Remote Data Results](#modify-remote-data-results)
- [Remote Data Item Count](#remote-data-item-count)
- [Search on Filtering](#search-on-filtering)
- [Tooltip on List Items](#tooltip-on-list-items)
- [Value Change Event Handling](#value-change-event-handling)
- [Icons in List Items](#icons-in-list-items)
- [Get Selected Item Value Programmatically](#get-selected-item-value-programmatically)

---

## Add Item Dynamically

Add items to the list after the component renders using the `addItem()` method:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownListModule, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist #ddl [dataSource]="sports" placeholder="Select a sport">
    </ejs-dropdownlist>
    <button (click)="addAtEnd()">Add at End</button>
    <button (click)="addAtIndex()">Add at Index 1</button>
  `
})
export class AppComponent {
  @ViewChild('ddl') public ddl?: DropDownListComponent;
  public sports = ['Cricket', 'Football', 'Tennis'];

  addAtEnd(): void {
    // Add as last item (no index = appended to end)
    this.ddl?.addItem({ text: 'Badminton', value: 'Badminton' });
  }

  addAtIndex(): void {
    // Insert at index 1 (second position, zero-based)
    this.ddl?.addItem({ text: 'Golf', value: 'Golf' }, 1);
  }
}
```

For object arrays with `[fields]` mapping, provide item properties matching your fields:
```typescript
// If fields = { text: 'Game', value: 'Id' }
this.ddl?.addItem({ Game: 'Volleyball', Id: 99 });
```

---

## Remove an Item

Remove a specific item using the `removeItem()` method:

```typescript
removeItem(): void {
  // Remove by value
  this.ddl?.removeItem('Tennis');

  // Remove by index
  this.ddl?.removeItem(2);

  // Remove by HTML LI element
  const liEl = document.querySelector('.e-list-item') as HTMLLIElement;
  this.ddl?.removeItem(liEl);
}
```

If the removed item is currently selected, the selection is cleared.

---

## Clear the Selected Item

Reset the DropDownList to show the placeholder (no selection):

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownListModule, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist #ddl [dataSource]="sports" [(value)]="selected" placeholder="Select">
    </ejs-dropdownlist>
    <button (click)="clearSelection()">Clear</button>
  `
})
export class AppComponent {
  @ViewChild('ddl') public ddl?: DropDownListComponent;
  public sports = ['Cricket', 'Football', 'Tennis'];
  public selected = 'Cricket';

  clearSelection(): void {
    // Option 1: Set value to null
    this.selected = null as any;

    // Option 2: Use component's clear method
    // this.ddl?.value = null;
  }
}
```

---

## Close Popup Programmatically

Control popup visibility with `showPopup()` and `hidePopup()`:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownListModule, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist #ddl [dataSource]="sports" placeholder="Select">
    </ejs-dropdownlist>
    <button (click)="ddl?.showPopup()">Open Popup</button>
    <button (click)="ddl?.hidePopup()">Close Popup</button>
  `
})
export class AppComponent {
  @ViewChild('ddl') public ddl?: DropDownListComponent;
  public sports = ['Cricket', 'Football', 'Tennis'];
}
```

---

## Cascading DropDownLists

Implement dependent dropdowns where a child dropdown's data depends on the parent's selection. Use the parent's `(change)` event to filter and load child data:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownListModule, DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <!-- Country -->
    <ejs-dropdownlist #country
      [dataSource]="countryData"
      [fields]="countryFields"
      (change)="onCountryChange($event)"
      placeholder="Select Country">
    </ejs-dropdownlist>

    <!-- State (disabled until country selected) -->
    <ejs-dropdownlist #state
      [dataSource]="stateData"
      [fields]="stateFields"
      [enabled]="stateEnabled"
      (change)="onStateChange($event)"
      placeholder="Select State">
    </ejs-dropdownlist>

    <!-- City (disabled until state selected) -->
    <ejs-dropdownlist #city
      [dataSource]="cityData"
      [fields]="cityFields"
      [enabled]="cityEnabled"
      placeholder="Select City">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  @ViewChild('state') public stateDropdown?: DropDownListComponent;
  @ViewChild('city') public cityDropdown?: DropDownListComponent;

  public stateEnabled = false;
  public cityEnabled = false;

  // All country data
  public countryData = [
    { id: 1, name: 'Australia' },
    { id: 2, name: 'United States' }
  ];
  public countryFields = { text: 'name', value: 'id' };

  // All state data (filter by countryId)
  private allStates = [
    { id: 11, name: 'New South Wales', countryId: 1 },
    { id: 12, name: 'Victoria',        countryId: 1 },
    { id: 21, name: 'California',      countryId: 2 },
    { id: 22, name: 'Texas',           countryId: 2 }
  ];
  public stateData: typeof this.allStates = [];
  public stateFields = { text: 'name', value: 'id' };

  // All city data (filter by stateId)
  private allCities = [
    { id: 111, name: 'Sydney',        stateId: 11 },
    { id: 112, name: 'Newcastle',     stateId: 11 },
    { id: 121, name: 'Melbourne',     stateId: 12 },
    { id: 211, name: 'Los Angeles',   stateId: 21 },
    { id: 221, name: 'Houston',       stateId: 22 }
  ];
  public cityData: typeof this.allCities = [];
  public cityFields = { text: 'name', value: 'id' };

  onCountryChange(args: ChangeEventArgs): void {
    // Filter states for selected country
    this.stateData = this.allStates.filter(s => s.countryId === args.value);
    this.stateEnabled = true;

    // Reset city
    this.cityData = [];
    this.cityEnabled = false;
    if (this.cityDropdown) this.cityDropdown.value = null as any;
  }

  onStateChange(args: ChangeEventArgs): void {
    // Filter cities for selected state
    this.cityData = this.allCities.filter(c => c.stateId === args.value);
    this.cityEnabled = true;
  }
}
```

---

## Customize Group Header

Customize the group header using `groupTemplate` in `ng-template`:

```html
<ejs-dropdownlist [dataSource]="items" [fields]="fields" placeholder="Select">
  <ng-template #groupTemplate let-data>
    <span style="color: #0078d4; font-weight: bold;">📂 {{ data.Category }}</span>
  </ng-template>
</ejs-dropdownlist>
```

For full disable of group header click (non-selectable), the group headers are non-interactive by default.

To **disable the group header** so it's visually distinct but completely unselectable (already default behavior), add a custom CSS style if needed:

```css
.e-list-group-item { cursor: default; pointer-events: none; background: #f5f5f5; }
```

---

## Highlight Filtered Characters

Highlight the matching characters in filtered results using an `itemTemplate` with custom logic:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownListModule, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  styles: [`
    ::ng-deep .highlight { background-color: yellow; font-weight: bold; }
  `],
  template: `
    <ejs-dropdownlist
      [dataSource]="sports"
      [allowFiltering]="true"
      (filtering)="onFilter($event)"
      placeholder="Search sports">
      <ng-template #itemTemplate let-data>
        <span [innerHTML]="highlight(data, filterText)"></span>
      </ng-template>
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public sports = ['Badminton', 'Basketball', 'Cricket', 'Football', 'Golf', 'Tennis'];
  public filterText = '';

  onFilter(args: FilteringEventArgs): void {
    this.filterText = args.text;
    const query = args.text
      ? new Query().where('', 'contains', args.text, true)
      : new Query();
    args.updateData(this.sports, query);
  }

  highlight(item: string, search: string): string {
    if (!search) return item;
    const regex = new RegExp(`(${search})`, 'gi');
    return item.replace(regex, '<span class="highlight">$1</span>');
  }
}
```

---

## Incremental Search

The DropDownList supports incremental search when the popup is closed — typing a character jumps to the first matching item. This is enabled by default and works with keyboard `A-Z`, `0-9` keys.

**Customize incremental search behavior in open popup:**

When the popup is open, typing still moves focus to matching items. To control this, handle the `filtering` event (when `allowFiltering` is enabled).

For **closed popup incremental search** (built-in), no additional configuration is needed — it works automatically.

---

## Modify Remote Data Results

Intercept and modify remote data before it is displayed using the `actionComplete` event:

```typescript
import { Component } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="remoteData"
      [query]="query"
      [fields]="fields"
      (actionComplete)="onDataLoaded($event)"
      placeholder="Select a customer">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public remoteData = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });
  public query = new Query().select(['CustomerID', 'ContactName']).take(10);
  public fields = { text: 'ContactName', value: 'CustomerID' };

  onDataLoaded(args: any): void {
    // Modify result data — e.g., append custom items
    args.result.push({ CustomerID: 'CUSTOM', ContactName: '+ Add New Customer' });
    // Or filter out certain items
    // args.result = args.result.filter((item: any) => item.CustomerID !== 'ALFKI');
  }
}
```

---

## Remote Data Item Count

Show the total count of items from a remote source using `footerTemplate`:

```html
<ejs-dropdownlist [dataSource]="remoteData" [fields]="fields" (actionComplete)="onLoaded($event)">
  <ng-template #footerTemplate>
    <span class="footer">Total records: {{ totalCount }}</span>
  </ng-template>
</ejs-dropdownlist>
```

```typescript
public totalCount = 0;

onLoaded(args: any): void {
  this.totalCount = args.result.length;
}
```

---

## Search on Filtering

Limit the popup search results to a specific count while still filtering:

```typescript
onFilter(args: FilteringEventArgs): void {
  const maxResults = 5; // Show only top 5 matching results
  let query = new Query();
  if (args.text !== '') {
    query = query.where('Game', 'startsWith', args.text, true).take(maxResults);
  }
  args.updateData(this.sports, query);
}
```

---

## Tooltip on List Items

Show a tooltip on each list item using the `itemTemplate` with the `title` attribute or a Syncfusion Tooltip:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist [dataSource]="items" [fields]="fields" placeholder="Select">
      <ng-template #itemTemplate let-data>
        <!-- Native HTML tooltip via title attribute -->
        <span [title]="data.description">{{ data.name }}</span>
      </ng-template>
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public items = [
    { name: 'Cricket',  value: 1, description: 'A bat-and-ball game' },
    { name: 'Football', value: 2, description: 'A sport played with a round ball' },
    { name: 'Tennis',   value: 3, description: 'A racket sport played individually or in pairs' }
  ];
  public fields = { text: 'name', value: 'value' };
}
```

---

## Value Change Event Handling

Detect whether a value change was triggered by user interaction or programmatically using the `isInteracted` flag in the `change` event:

```typescript
import { Component } from '@angular/core';
import { DropDownListModule, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="sports"
      [(value)]="selected"
      (change)="onChange($event)"
      placeholder="Select a sport">
    </ejs-dropdownlist>
    <button (click)="setProgrammatically()">Set Football Programmatically</button>
    <p>Last change: {{ changeSource }}</p>
  `
})
export class AppComponent {
  public sports = ['Cricket', 'Football', 'Tennis'];
  public selected = '';
  public changeSource = '';

  onChange(args: ChangeEventArgs): void {
    if (args.isInteracted) {
      this.changeSource = `User selected: ${args.value}`;
    } else {
      this.changeSource = `Programmatically set to: ${args.value}`;
    }
  }

  setProgrammatically(): void {
    this.selected = 'Football';
  }
}
```

**ChangeEventArgs properties:**
- `args.value` — new selected value
- `args.previousValue` — previous value
- `args.isInteracted` — `true` if user triggered, `false` if programmatic
- `args.item` — the selected list item element
- `args.itemData` — the full data object of the selected item

---

## Icons in List Items

Add icons to list items using `fields.iconCss` and CSS icon classes:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  styles: [`
    .cricket-icon::before  { content: '🏏'; margin-right: 6px; }
    .football-icon::before { content: '⚽'; margin-right: 6px; }
    .tennis-icon::before   { content: '🎾'; margin-right: 6px; }
  `],
  template: `
    <ejs-dropdownlist
      [dataSource]="sports"
      [fields]="fields"
      placeholder="Select a sport">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public sports = [
    { id: 1, name: 'Cricket',  icon: 'cricket-icon' },
    { id: 2, name: 'Football', icon: 'football-icon' },
    { id: 3, name: 'Tennis',   icon: 'tennis-icon' }
  ];
  public fields = { text: 'name', value: 'id', iconCss: 'icon' };
}
```

The `iconCss` field maps to a CSS class applied to a `<span>` before each item label. Use Syncfusion's built-in icon classes (prefixed with `e-icons`) or custom CSS classes.

---

## Get Selected Item Value Programmatically

Access the selected value, text, and data object through the component reference:

```typescript
@ViewChild('ddl') public ddl?: DropDownListComponent;

getSelectedInfo(): void {
  console.log('Value:', this.ddl?.value);         // The selected value (e.g., 1)
  console.log('Text:', this.ddl?.text);           // The display text (e.g., 'Cricket')
  console.log('Item data:', this.ddl?.itemData);  // Full data object (e.g., { id: 1, name: 'Cricket' })
  console.log('Index:', this.ddl?.index);         // Zero-based index of selected item
}
```

---

## See Also

- [Filtering](filtering.md) — filtering event and debounce
- [Templates](templates.md) — item, value, header, footer templates
- [Grouping & Virtualization](grouping-and-virtualization.md) — groupBy and virtual scroll
- [Disabled Items & Forms](disabled-items-and-forms.md) — cascading with reactive forms
